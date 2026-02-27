# Data Model: Secondary Pages (007)

**Branch**: `007-secondary-pages` | **Date**: 2026-02-26

> These pages are static — no database, no server state. All data flows from translation files (`ar.json` / `en.json`) and compile-time constants.

---

## Entities

### ContactChannel

Represents one contact method card on the Contact page.

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Translation key (e.g., `"whatsapp"`, `"phone"`) |
| `label` | `string` | Translated label (from `contact.[key]`) |
| `href` | `string` | Action URL (`wa.me/...`, `tel:...`, `mailto:...`, social link) |
| `icon` | `LucideIcon` | Lucide React icon component |
| `external` | `boolean` | Whether to open in a new tab (`target="_blank"`) |
| `ariaLabel` | `string` | Accessible label (from translations) |

**Validation rules**:
- `href` must be non-empty
- External social links must include `rel="noopener noreferrer"`
- WhatsApp and Phone links are not external (handled by OS/browser natively)

**State transitions**: None — purely presentational.

---

### SizeEntry

Represents one row in the size measurement table.

| Field | Type | Description |
|-------|------|-------------|
| `size` | `"XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL"` | Size label |
| `heightRange` | `string` | Height range in cm (e.g., `"148–153"`) |
| `chestRange` | `string` | Chest range in cm (e.g., `"84–88"`) |
| `waistRange` | `string` | Waist range in cm (e.g., `"68–72"`) |

**Data source**: Hardcoded constant array in `SizeGuideContent.tsx` (measurement values don't change per locale — only column headers are translated).

**Complete dataset**:

```ts
const SIZE_TABLE: SizeEntry[] = [
  { size: "XS",  heightRange: "148–153", chestRange: "84–88",   waistRange: "68–72"  },
  { size: "S",   heightRange: "153–158", chestRange: "88–92",   waistRange: "72–76"  },
  { size: "M",   heightRange: "158–163", chestRange: "92–96",   waistRange: "76–80"  },
  { size: "L",   heightRange: "163–168", chestRange: "96–102",  waistRange: "80–86"  },
  { size: "XL",  heightRange: "168–173", chestRange: "102–108", waistRange: "86–92"  },
  { size: "XXL", heightRange: "173–178", chestRange: "108–116", waistRange: "92–100" },
];
```

---

### MeasurementStep

Represents one step in the "How to Measure" section of the Size Guide page.

| Field | Type | Description |
|-------|------|-------------|
| `icon` | `TablerIcon` | Icon from `@tabler/icons-react` |
| `labelKey` | `string` | Translation key for step label (e.g., `"sizeGuide.steps.height"`) |
| `descKey` | `string` | Translation key for step description |

**Steps defined**:
1. Height (`IconRuler`) — stand straight, measure from top of head to floor
2. Chest (`IconArrowsHorizontal`) — measure around fullest part of chest
3. Waist (`IconArrowsVertical`) — measure around narrowest part of waist

---

### PolicySection

Represents one policy block on the Returns & Shipping page.

| Field | Type | Description |
|-------|------|-------------|
| `icon` | `LucideIcon` | Lucide React icon for the section header |
| `titleKey` | `string` | Translation key for section heading |
| `bodyKey` | `string` | Translation key for section body text |

**Sections**:
1. Free Shipping banner (full-width highlight)
2. Shipping Policy (`returns.shippingTitle` / `returns.shippingPolicy`)
3. Returns/Exchange Policy (`returns.returnsTitle` / `returns.returnsPolicy`)
4. WhatsApp CTA for exchanges

---

## Translation Key Requirements

### Keys to ADD (missing from current files)

| Namespace | Key | AR value | EN value |
|-----------|-----|----------|----------|
| `contact` | `subtitle` | `"سنكون سعيدات بالتواصل معكِ"` | `"We'd love to hear from you"` |
| `contact` | `whatsappHint` | `"اضغطي للتواصل المباشر"` | `"Tap to chat directly"` |
| `sizeGuide` | `subtitle` | `"اختاري مقاسك بدقة"` | `"Find your perfect fit"` |
| `sizeGuide` | `steps.height` | `"الطول"` | `"Height"` |
| `sizeGuide` | `steps.heightDesc` | `"قفي منتصبة وقيسي من أعلى الرأس حتى الأرض"` | `"Stand straight and measure from top of head to floor"` |
| `sizeGuide` | `steps.chest` | `"الصدر"` | `"Chest"` |
| `sizeGuide` | `steps.chestDesc` | `"قيسي حول أعرض جزء من الصدر"` | `"Measure around the fullest part of your chest"` |
| `sizeGuide` | `steps.waist` | `"الخصر"` | `"Waist"` |
| `sizeGuide` | `steps.waistDesc` | `"قيسي حول أضيق جزء من الخصر"` | `"Measure around the narrowest part of your waist"` |
| `returns` | `subtitle` | `"الشحن والإرجاع"` | `"Our policies, for your peace of mind"` |
| `returns` | `shippingTitle` | `"سياسة الشحن"` | `"Shipping Policy"` |
| `returns` | `returnsTitle` | `"سياسة الاستبدال"` | `"Exchange Policy"` |
| `returns` | `exchangeCta` | `"لبدء طلب الاستبدال، تواصلي معنا عبر واتساب"` | `"To start an exchange request, contact us via WhatsApp"` |

### Keys to CORRECT (wrong values in current files)

| File | Key | Current (wrong) | Corrected |
|------|-----|-----------------|-----------|
| `en.json` | `returns.shippingPolicy` | "...within 2–3 business days..." | "...within 2–5 business days..." |
| `ar.json` | `returns.shippingPolicy` | "...خلال ٢-٣ أيام عمل..." | "...خلال ٢-٥ أيام عمل..." |
| `en.json` | `returns.returnsPolicy` | "We accept returns within 7 days..." | "We accept exchanges (not refunds) within 7 days of delivery. Items must be unworn, tagged, and in original packaging. To initiate an exchange, contact us via WhatsApp." |
| `ar.json` | `returns.returnsPolicy` | "نقبل الإرجاع خلال ٧ أيام..." | "نقبل الاستبدال (دون استرداد المبلغ) خلال ٧ أيام من تاريخ الاستلام. يجب أن يكون المنتج غير مرتدى مع البطاقات والتغليف الأصلي. للبدء بعملية الاستبدال تواصلي معنا عبر واتساب." |

---

## New Function Required in `whatsapp.ts`

```ts
/**
 * Generates a WhatsApp URL pre-filled with an exchange request message.
 * Used by the Returns & Shipping page CTA.
 */
export function generateExchangeRequestUrl(locale: "ar" | "en"): string {
    const message =
        locale === "ar"
            ? "مرحباً، أرغب في بدء طلب استبدال"
            : "Hello, I'd like to initiate an exchange request";
    return `https://wa.me/971502507859?text=${encodeURIComponent(message)}`;
}
```
