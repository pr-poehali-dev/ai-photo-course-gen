import json
import os
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Генерация изображения через DALL-E 3 по текстовому описанию"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Method not allowed"}),
        }

    body = json.loads(event.get("body") or "{}")
    prompt = body.get("prompt", "").strip()
    style = body.get("style", "Реализм")
    size_ratio = body.get("size", "1:1")
    quality = body.get("quality", "HD")

    if not prompt:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Описание не может быть пустым"}),
        }

    size_map = {
        "1:1": "1024x1024",
        "16:9": "1792x1024",
        "9:16": "1024x1792",
        "4:3": "1024x1024",
    }
    dalle_size = size_map.get(size_ratio, "1024x1024")
    dalle_quality = "hd" if quality in ("HD", "4K") else "standard"

    style_prompts = {
        "Реализм": "photorealistic, highly detailed, professional photography",
        "Аниме": "anime style, manga art, vibrant colors, Japanese animation",
        "Масло": "oil painting style, textured brushstrokes, classical art",
        "Акварель": "watercolor painting, soft colors, artistic watercolor style",
        "Киберпанк": "cyberpunk style, neon lights, futuristic city, dark atmosphere",
        "Минимализм": "minimalist style, clean lines, simple composition, minimal colors",
        "Поп-арт": "pop art style, bold colors, comic book style, Andy Warhol inspired",
        "Ретро": "retro vintage style, 80s aesthetic, nostalgic, film grain",
    }
    style_suffix = style_prompts.get(style, "")
    full_prompt = f"{prompt}. Style: {style_suffix}"

    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "API ключ не настроен"}),
        }

    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": full_prompt,
        "n": 1,
        "size": dalle_size,
        "quality": dalle_quality,
        "response_format": "url",
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=55) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            image_url = result["data"][0]["url"]
            revised_prompt = result["data"][0].get("revised_prompt", prompt)

            return {
                "statusCode": 200,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({
                    "url": image_url,
                    "revised_prompt": revised_prompt,
                }),
            }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            error_data = json.loads(error_body)
            message = error_data.get("error", {}).get("message", "Ошибка OpenAI")
        except Exception:
            message = error_body
        return {
            "statusCode": e.code,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": message}),
        }
