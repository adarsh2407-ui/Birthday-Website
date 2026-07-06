from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

base = Path('assets')
(base / 'images').mkdir(parents=True, exist_ok=True)
(base / 'music').mkdir(parents=True, exist_ok=True)
(base / 'videos').mkdir(parents=True, exist_ok=True)

for i in range(1, 4):
    img = Image.new('RGB', (800, 600), (255, 240, 246))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((40, 40, 760, 560), fill=(255, 143, 181), outline=(195, 156, 255), width=8)
    try:
        font = ImageFont.truetype('arial.ttf', 48)
    except Exception:
        font = ImageFont.load_default()
    draw.text((220, 250), f'Photo {i}', fill=(60, 41, 70), font=font)
    img.save(base / 'images' / f'photo{i}.jpg')

for path in [base / 'music' / 'track1.mp3', base / 'music' / 'voice1.mp3', base / 'videos' / 'memory1.mp4']:
    path.write_bytes(b'')

print('Generated placeholder assets')
