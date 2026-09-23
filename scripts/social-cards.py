"""Render deterministic 1200x630 typographic Open Graph cards (Pillow required)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT = Path('/usr/share/fonts/liberation/LiberationSans-Bold.ttf')
REGULAR = FONT.with_name('LiberationSans-Regular.ttf')
if not FONT.exists():
    raise SystemExit('Install Liberation Sans or update FONT to a local licensed font.')
CARDS = {
    'athletickle': ('PARKOUR + STRENGTH', ['A training plan', 'with a direction.'], 'Meet the coach. Join the beta community.'),
    'parkour': ('ATHLETICKLE PARKOUR', ['Strength and power.', 'Built around parkour.'], 'Complementary training. A structured roadmap.'),
    'strength': ('ATHLETICKLE STRENGTH', ['Give your strength', 'training a direction.'], 'Strength. Muscle. A two-day option.'),
    'about': ('MIKA / FOUNDER OF ATHLETICKLE', ['Coaching experience.', 'Made more accessible.'], 'MSc in Exercise Physiology. Parkour since 2005.'),
}
for name, (label, lines, subtitle) in CARDS.items():
    image = Image.new('RGB', (1200, 630), '#0a0a0a')
    draw = ImageDraw.Draw(image)
    accent = '#a0ddd5' if name == 'strength' else '#e58d59'
    draw.rectangle((0, 0, 1200, 12), fill=accent)
    draw.rectangle((850, 0, 1200, 630), fill='#121413')
    draw.line((1020, 60, 1020, 570), fill='#373b36', width=2)
    for i in range(3):
        y = 125 + 155 * i
        draw.rectangle((930, y, 1110, y + 110), outline=accent if i == 0 else '#454a44', width=2)
        draw.text((955, y + 23), f'0{i+1}', font=ImageFont.truetype(str(FONT), 52), fill=accent if i == 0 else '#747d72')
    draw.text((65, 70), 'ATHLETICKLE', font=ImageFont.truetype(str(FONT), 26), fill='#f5f3ef')
    draw.text((65, 169), label, font=ImageFont.truetype(str(FONT), 19), fill=accent)
    for i, line in enumerate(lines):
        size = 62
        while draw.textlength(line, font=ImageFont.truetype(str(FONT), size)) > 740:
            size -= 1
        draw.text((62, 230 + i * 79), line, font=ImageFont.truetype(str(FONT), size), fill='#f5f3ef')
    draw.text((65, 438), subtitle, font=ImageFont.truetype(str(REGULAR), 25), fill='#b9b7b3')
    draw.text((65, 554), 'PRE-LAUNCH  /  ATHLETICKLE.COM', font=ImageFont.truetype(str(FONT), 18), fill=accent)
    image.save(ROOT / 'public' / 'social' / f'{name}.png', optimize=True)
