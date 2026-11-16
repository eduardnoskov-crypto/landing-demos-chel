# -*- coding: utf-8 -*-
"""Сборка базы рассылки: 10 компаний с готовыми лендингами (со ссылками)."""
import csv
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

SRC = Path(r"D:\Эдуард Носков\Projects\поисковик\лендинг_крюки_100.csv")
OUT = Path(r"D:\Эдуард Носков\Projects\Челябинский бизнес без лендинга\челябинск-бизнес-без-сайтов.csv")

# как в gen_landings.js: имя в базе -> короткое имя, ниша, слаг лендинга
DEMOS = {
    "на труда": ("На Труда, кафе №1", "Кафе-шаурма", "na-truda-cafe"),
    "медуза": ("Медуза Суши", "Суши и роллы", "meduza-sushi"),
    "black papa": ("Black papa", "Барбершоп", "black-papa"),
    "moika otido": ("Moika Otido", "Автомойка", "moika-otido"),
    "алмаз в роднике": ("Алмаз в роднике", "Ювелирная мастерская", "almaz-rodnik"),
    "i-flagman": ("I-Flagman", "Сервисный центр", "i-flagman"),
    "роза челябинск": ("Роза Челябинск", "Магазин цветов", "roza-chel"),
    "экспресс-ателье": ("Экспресс-ателье", "Ателье", "ekspress-atelier"),
    "зоодоктор": ("ЗооДоктор", "Ветклиника", "zoo-doktor"),
    "акуна матата": ("Акуна Матата", "Турагентство", "akuna-matata"),
}
BASE_URL = "https://eduardnoskov-crypto.github.io/landing-demos-chel/"

rows = list(csv.DictReader(SRC.open(encoding="utf-8-sig"), delimiter=";"))

picked = []
seen = set()
for r in rows:
    name = (r.get("Название") or "").strip()
    key = name.lower().replace("ё", "е")
    for token, (short, niche, slug) in DEMOS.items():
        if token in key and short not in seen:
            seen.add(short)
            picked.append({
                "Название": name,
                "Тип": niche,
                "Адрес": (r.get("Адрес") or "").strip(),
                "E-mail": (r.get("Email") or "").strip().lower(),
                "Рейтинг": (r.get("Рейтинг 2ГИС") or "").strip().replace(".", ","),
                "Отзывы": (r.get("Отзывов") or "").strip(),
                "Ссылка": BASE_URL + slug + "/",
            })

with OUT.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, delimiter=";", fieldnames=["Название", "Тип", "Адрес", "E-mail", "Рейтинг", "Отзывы", "Ссылка"])
    w.writeheader()
    w.writerows(picked)

print(f"Записано: {len(picked)} из 10 ожидаемых")
for p in picked:
    print(f"  {p['Название']} | {p['E-mail']} | {p['Рейтинг']}★/{p['Отзывы']} | {p['Ссылка']}")
missing = [s for _, (s, _, sl) in DEMOS.items() if s not in seen]
if missing:
    print("НЕ НАЙДЕНЫ в базе:", missing)
