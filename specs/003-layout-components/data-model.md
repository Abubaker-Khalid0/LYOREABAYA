# Data Model: Layout Components

**Branch**: `003-layout-components` | **Date**: 2026-02-22

## Entities

### Locale

The active language/direction setting, determined by the URL path prefix.

| Attribute | Type | Description |
|-----------|------|-------------|
| code | `"ar" \| "en"` | ISO language code |
| direction | `"rtl" \| "ltr"` | Document direction, derived from code |
| fontHeadingVar | string | CSS variable for heading font (`--font-heading-ar` or `--font-heading-en`) |
| fontBodyVar | string | CSS variable for body font (`--font-body-ar` or `--font-body-en`) |

**Source**: Managed by `next-intl` routing. No custom storage required.

---

### Navigation Link

A labeled route path used in Navbar, MobileDrawer, and Footer.

| Attribute | Type | Description |
|-----------|------|-------------|
| labelKey | string | Translation key (e.g., `nav.home`, `nav.collections`) |
| href | string | Route path (e.g., `/`, `/collections`, `/size-guide`, `/contact`) |

**Source**: Defined as a constant array in the Navbar component. Labels resolved from translation files at render time.

**Values** (fixed set, not user-configurable):

| labelKey | href |
|----------|------|
| `nav.home` | `/` |
| `nav.collections` | `/collections` |
| `nav.sizeGuide` | `/size-guide` |
| `nav.contact` | `/contact` |

---

### Social Link

An external profile URL displayed in the Footer.

| Attribute | Type | Description |
|-----------|------|-------------|
| platform | string | Platform identifier (instagram, tiktok, snapchat) |
| url | string | Full external URL |
| labelKey | string | Translation key for accessible label |

**Values** (fixed set):

| platform | url | labelKey |
|----------|-----|----------|
| instagram | `https://instagram.com/lyoreabaya` | `contact.instagram` |
| tiktok | `https://tiktok.com/@lyoreabaya` | `contact.tiktok` |
| snapchat | `https://snapchat.com/add/lyoreabaya` | `contact.snapchat` |

---

### AnnouncementBar State

A transient boolean controlling bar visibility.

| Attribute | Type | Storage | Description |
|-----------|------|---------|-------------|
| isDismissed | boolean | sessionStorage (`lyore-announcement-dismissed`) | `true` = bar hidden for current session |

**Lifecycle**: Defaults to `false` on new session. Set to `true` on dismiss. Cleared when browser tab closes.

---

### Contact Info

Contact details displayed in the Footer.

| Attribute | Type | Value |
|-----------|------|-------|
| whatsappUrl | string | `https://wa.me/971502507859` |
| email | string | (to be confirmed — not in current translations) |
| phone | string | `+971 50 250 7859` |

## Relationships

```text
BaseLayout
├── AnnouncementBar (uses: AnnouncementBarState, Locale)
├── Navbar (uses: NavigationLink[], Locale)
│   ├── LanguageSwitcher (uses: Locale)
│   └── MobileDrawer (uses: NavigationLink[], Locale)
│       └── LanguageSwitcher (uses: Locale)
├── {children} (page content)
└── Footer (uses: NavigationLink[], SocialLink[], ContactInfo, Locale)
```
