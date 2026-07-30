// The upcoming-trend pool that powers the guided Studio experience.
//
// Every entry here is a REAL published trend forecast, compiled 2026-07-30
// from Pinterest Predicts, WGSN, McKinsey/BoF State of Fashion, TikTok Next,
// Spate, Mintel, Circana, Glossy, BeautyMatter, Who What Wear, Refinery29,
// Depop/ThredUp resale reports, and other named sources - each entry keeps
// its source name + URL so nothing here reads as invented.
//
// The AI matching layer (app/api/studio/*) is schema-constrained to the ids
// in this file: it can pick and explain, but it cannot make a trend up.
// Same guardrail the Trend Dashboard proved.

export type PoolTrend = {
  id: string;
  name: string;
  category: "fashion" | "beauty" | "culture";
  tags: string[];
  description: string;
  trajectory: "emerging" | "rising" | "peaking-next-year";
  source: string;
  sourceUrl: string;
  audience: string;
  channels: string[];
};

export const TREND_POOL: PoolTrend[] = [
  {
    id: "le-smoking-tuxedo-dressing",
    name: "Le Smoking Tuxedo Dressing",
    category: "fashion",
    tags: ["tailoring", "occasionwear", "womenswear", "luxury", "eveningwear"],
    description: "Tuxedo-inspired dressing referencing YSL's Le Smoking — tailored jackets with satin lapels, bow ties and formal evening details — swept the Fall/Winter 2026 runways and is set to define next winter's eveningwear.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fashion-week-trends-fall-winter-2026",
    audience: "millennial professionals",
    channels: ["Editorial", "Instagram", "In-store"]
  },
  {
    id: "shrink-wrap-silhouettes",
    name: "Shrink-Wrap Silhouettes",
    category: "fashion",
    tags: ["tailoring", "womenswear", "y2k", "minimalism"],
    description: "Body-skimming, precisely fitted silhouettes — skinny flared pants and column skirts echoing early-2000s tailoring — emerged on Fall/Winter 2026 runways as the pendulum swings away from oversized volume.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fashion-week-trends-fall-winter-2026",
    audience: "fashion-forward Gen Z and millennial women",
    channels: ["Editorial", "TikTok", "Instagram"]
  },
  {
    id: "skirt-suit-sets",
    name: "Skirt Suit Sets",
    category: "fashion",
    tags: ["tailoring", "workwear", "womenswear", "occasionwear"],
    description: "Coordinating skirt suits in silhouettes from pared-back to peplumed appeared across Fall/Winter 2026 collections, positioning the matched set as the new power uniform.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fashion-week-trends-fall-winter-2026",
    audience: "millennial professionals",
    channels: ["Editorial", "In-store", "Pinterest"]
  },
  {
    id: "purple-reign",
    name: "Purple Reign",
    category: "fashion",
    tags: ["color", "womenswear", "luxury", "runway"],
    description: "Vibrant regal purple ran through nearly every major Fall/Winter 2026 collection, often worn head-to-toe, making it the color to buy into for late 2026.",
    trajectory: "peaking-next-year",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fashion-week-trends-fall-winter-2026",
    audience: "trend-driven women across ages",
    channels: ["Editorial", "In-store", "Pinterest"]
  },
  {
    id: "modern-heirlooms",
    name: "Modern Heirlooms",
    category: "fashion",
    tags: ["luxury", "craft", "occasionwear", "sustainability"],
    description: "Investment pieces with rich brocade, embroidery and beading designed to feel like collector's items to be handed down — a Fall/Winter 2026 runway answer to fast-fashion fatigue.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fashion-week-trends-fall-winter-2026",
    audience: "affluent millennial and Gen X women",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "sheer-window-dressing",
    name: "Sheer Window Dressing",
    category: "fashion",
    tags: ["layering", "womenswear", "runway", "eveningwear"],
    description: "Translucent layers — clear PVC and structured mesh revealing the garments beneath — offered a more modest evolution of naked dressing on the Fall/Winter 2026 runways.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fashion-week-trends-fall-winter-2026",
    audience: "Gen Z women",
    channels: ["Instagram", "Editorial", "TikTok"]
  },
  {
    id: "statement-tights",
    name: "Statement Tights",
    category: "fashion",
    tags: ["accessories", "hosiery", "womenswear", "budget"],
    description: "Patterned and boldly colored tights moved from afterthought to styling tool across Fall/Winter 2026 collections tracked in Net-a-Porter's season edit — an inexpensive way to update outfits.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/net-a-porter-fall-2026-trends",
    audience: "Gen Z and young millennial women",
    channels: ["Pinterest", "TikTok", "In-store"]
  },
  {
    id: "chartreuse-color-blocking",
    name: "Chartreuse Color Blocking",
    category: "fashion",
    tags: ["color", "womenswear", "runway", "luxury"],
    description: "Chartreuse and purple appeared consistently through fashion month, styled via bold color blocking and tonal clashes — flagged by Net-a-Porter as a defining Fall/Winter 2026 buy.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/net-a-porter-fall-2026-trends",
    audience: "fashion-forward women",
    channels: ["Editorial", "Instagram", "In-store"]
  },
  {
    id: "noir-florals",
    name: "Noir Florals",
    category: "fashion",
    tags: ["prints", "womenswear", "occasionwear", "romantic"],
    description: "Dark, moody florals woven into rich textures replaced sweet spring blooms across Fall 2026 fashion month, feeding the broader gothic-romance mood heading into 2027.",
    trajectory: "rising",
    source: "InStyle",
    sourceUrl: "https://www.aol.com/articles/20-fashion-month-trends-fall-130230680.html",
    audience: "millennial and Gen Z women",
    channels: ["Pinterest", "Editorial", "Instagram"]
  },
  {
    id: "grandma-faux-furs",
    name: "Grandma Faux Furs",
    category: "fashion",
    tags: ["outerwear", "vintage", "luxury", "womenswear"],
    description: "Belted, dramatic faux-fur coats evoking vintage glamour dominated Fall 2026 fashion month, extending fashion's love affair with heirloom-style outerwear into next winter.",
    trajectory: "rising",
    source: "InStyle",
    sourceUrl: "https://www.aol.com/articles/20-fashion-month-trends-fall-130230680.html",
    audience: "vintage-loving millennials and Gen Z",
    channels: ["Pinterest", "In-store", "Editorial"]
  },
  {
    id: "ties-for-her",
    name: "Ties for Her",
    category: "fashion",
    tags: ["menswear-influence", "workwear", "womenswear", "tailoring"],
    description: "Feminine shirts finished with neckties became a defining office-dressing statement of the Fall 2026 shows, part of a broader borrowed-from-the-boys tailoring wave.",
    trajectory: "emerging",
    source: "InStyle",
    sourceUrl: "https://www.aol.com/articles/20-fashion-month-trends-fall-130230680.html",
    audience: "young professional women",
    channels: ["TikTok", "Editorial", "Pinterest"]
  },
  {
    id: "nineties-finance-tailoring",
    name: "Nineties Finance Tailoring",
    category: "fashion",
    tags: ["tailoring", "workwear", "menswear-influence", "minimalism"],
    description: "Relaxed, androgynous suiting inspired by 1990s silhouettes — dubbed 'fashion finance' — ran through the Fall 2026 collections as officewear codes turn looser and more gender-fluid.",
    trajectory: "rising",
    source: "InStyle",
    sourceUrl: "https://www.aol.com/articles/20-fashion-month-trends-fall-130230680.html",
    audience: "millennial professionals",
    channels: ["Editorial", "Instagram", "In-store"]
  },
  {
    id: "peak-peplums",
    name: "Peak Peplums",
    category: "fashion",
    tags: ["silhouette", "womenswear", "occasionwear", "revival"],
    description: "Shortened, modernized peplum silhouettes resurfaced across Fall 2026 fashion month, signaling a wider return of waist-emphasizing shapes into 2027.",
    trajectory: "rising",
    source: "InStyle",
    sourceUrl: "https://www.aol.com/articles/20-fashion-month-trends-fall-130230680.html",
    audience: "Gen Z and millennial women",
    channels: ["TikTok", "Editorial", "In-store"]
  },
  {
    id: "armoured-romance-corsetry",
    name: "Armoured Romance Corsetry",
    category: "fashion",
    tags: ["occasionwear", "corsetry", "womenswear", "bridal"],
    description: "Spring/Summer 2027 forecasting centers corsetry that both protects and entices — structured corseted bodices softened with lace and embroidery, spilling into bridal and eveningwear.",
    trajectory: "peaking-next-year",
    source: "FashionUnited",
    sourceUrl: "https://fashionunited.com/news/fashion/spring-summer-2027-trend-report-navigating-a-polycrisis-season-of-pleasure-protection-and-the-quiet-return-of-elegance/2026052872627",
    audience: "Gen Z and millennial women",
    channels: ["Pinterest", "Editorial", "Instagram"]
  },
  {
    id: "return-of-the-waist",
    name: "Return of the Waist",
    category: "fashion",
    tags: ["silhouette", "tailoring", "womenswear", "elegance"],
    description: "Forecasters call Spring/Summer 2027 a quiet return of elegance: emphasized waists, balloon shapes, peplums and refined tailoring after years of streetwear-led volume.",
    trajectory: "peaking-next-year",
    source: "FashionUnited",
    sourceUrl: "https://fashionunited.com/news/fashion/spring-summer-2027-trend-report-navigating-a-polycrisis-season-of-pleasure-protection-and-the-quiet-return-of-elegance/2026052872627",
    audience: "millennial and Gen X women",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "visible-handcraft",
    name: "Visible Handcraft",
    category: "fashion",
    tags: ["craft", "sustainability", "luxury", "artisanal"],
    description: "Handwork, patina and deliberate imperfection — crochet, sculptural pleating, naturally dyed leather — are forecast as a Spring/Summer 2027 counterweight to AI-generated polish.",
    trajectory: "peaking-next-year",
    source: "FashionUnited",
    sourceUrl: "https://fashionunited.com/news/fashion/spring-summer-2027-trend-report-navigating-a-polycrisis-season-of-pleasure-protection-and-the-quiet-return-of-elegance/2026052872627",
    audience: "conscious consumers, affluent millennials",
    channels: ["Editorial", "Instagram", "In-store"]
  },
  {
    id: "bridal-codes-in-daywear",
    name: "Bridal Codes in Daywear",
    category: "fashion",
    tags: ["occasionwear", "bridal", "womenswear", "romantic"],
    description: "High necklines, corseted bodices, basque waists and statement mantilla-style veils cross from bridal into fashion for Spring/Summer 2027, per trend-forecast roundups.",
    trajectory: "peaking-next-year",
    source: "FashionUnited",
    sourceUrl: "https://fashionunited.com/news/fashion/spring-summer-2027-trend-report-navigating-a-polycrisis-season-of-pleasure-protection-and-the-quiet-return-of-elegance/2026052872627",
    audience: "Gen Z and millennial women",
    channels: ["Pinterest", "Editorial"]
  },
  {
    id: "gingham-domesticity",
    name: "Gingham Domesticity",
    category: "fashion",
    tags: ["prints", "womenswear", "cottagecore", "linen"],
    description: "Vichy and tea-towel checks on linen anchor a 'grounded domesticity' story for Spring/Summer 2027 — farmer's-market charm aimed at brands like COS, Arket and Rixo.",
    trajectory: "peaking-next-year",
    source: "FashionUnited",
    sourceUrl: "https://fashionunited.com/news/fashion/spring-summer-2027-trend-report-navigating-a-polycrisis-season-of-pleasure-protection-and-the-quiet-return-of-elegance/2026052872627",
    audience: "affluent millennials",
    channels: ["Pinterest", "In-store", "Editorial"]
  },
  {
    id: "luminous-blue-everything",
    name: "Luminous Blue Everything",
    category: "fashion",
    tags: ["color", "forecasting", "activewear", "womenswear"],
    description: "WGSN and Coloro named Luminous Blue the Colour of the Year 2027, a versatile 'mysterious and eccentric' hue expected across everything from formalwear to activewear.",
    trajectory: "peaking-next-year",
    source: "WGSN",
    sourceUrl: "https://www.wgsn.com/en/wgsn/press/press-releases/wgsn-and-coloro-reveal-colour-year-2027-luminous-blue-and-s-s-27-key",
    audience: "mass-market consumers across demographics",
    channels: ["In-store", "Editorial", "Pinterest"]
  },
  {
    id: "elevated-linen-suiting",
    name: "Elevated Linen Suiting",
    category: "fashion",
    tags: ["menswear", "tailoring", "summer", "luxury"],
    description: "Spring/Summer 2027 menswear runways elevated linen tailoring beyond vacation wear — 1940s double-breasted jackets, soft blazers and open vests for polished warm-weather dressing.",
    trajectory: "peaking-next-year",
    source: "Style Arcade",
    sourceUrl: "https://www.stylearcade.com/blog/mens-fashion-week-spring-summer-2027-trend-report",
    audience: "millennial and Gen X men",
    channels: ["Editorial", "In-store", "Instagram"]
  },
  {
    id: "the-menswear-slim-down",
    name: "The Menswear Slim-Down",
    category: "fashion",
    tags: ["menswear", "denim", "silhouette", "streetwear"],
    description: "Super-skinny jeans and trousers returned on the Spring/Summer 2027 menswear runways, a sharp break from years of exaggerated oversized proportions.",
    trajectory: "peaking-next-year",
    source: "Style Arcade",
    sourceUrl: "https://www.stylearcade.com/blog/mens-fashion-week-spring-summer-2027-trend-report",
    audience: "Gen Z men",
    channels: ["TikTok", "Instagram", "Editorial"]
  },
  {
    id: "refined-mountainwear",
    name: "Refined Mountainwear",
    category: "fashion",
    tags: ["menswear", "gorpcore", "outdoor", "athleisure"],
    description: "Utility shirts, hiking pants and technical outerwear like windbreakers and toggle coats blended outdoor function with sartorial refinement at the Spring/Summer 2027 menswear shows.",
    trajectory: "rising",
    source: "Style Arcade",
    sourceUrl: "https://www.stylearcade.com/blog/mens-fashion-week-spring-summer-2027-trend-report",
    audience: "outdoorsy millennial men",
    channels: ["Instagram", "In-store", "YouTube"]
  },
  {
    id: "dandy-knitwear",
    name: "Dandy Knitwear",
    category: "fashion",
    tags: ["menswear", "knitwear", "vintage", "preppy"],
    description: "Eccentric vintage-style knits — Fair Isle vests, printed V-necks in shrunken or stretched proportions — marked Spring/Summer 2027 menswear's turn toward personality-driven dressing.",
    trajectory: "emerging",
    source: "Style Arcade",
    sourceUrl: "https://www.stylearcade.com/blog/mens-fashion-week-spring-summer-2027-trend-report",
    audience: "Gen Z men, vintage shoppers",
    channels: ["TikTok", "Instagram", "Editorial"]
  },
  {
    id: "glamoratti-power-glam",
    name: "Glamoratti Power Glam",
    category: "fashion",
    tags: ["tailoring", "maximalism", "jewelry", "80s"],
    description: "Pinterest Predicts 2026 forecasts 1980s-luxury maximalism: sculpted-shoulder suits, funnel necks and bold chunky jewelry, driven by rising searches from Gen Z and millennials.",
    trajectory: "rising",
    source: "Pinterest Newsroom",
    sourceUrl: "https://newsroom.pinterest.com/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
    audience: "Gen Z and millennial women",
    channels: ["Pinterest", "Instagram"]
  },
  {
    id: "poetcore",
    name: "Poetcore",
    category: "fashion",
    tags: ["aesthetic", "vintage", "academia", "gen-z"],
    description: "A literary-inspired aesthetic of oversized turtlenecks, vintage blazers and messenger satchels that Pinterest Predicts flags as a breakout 2026 identity trend.",
    trajectory: "emerging",
    source: "Pinterest Newsroom",
    sourceUrl: "https://newsroom.pinterest.com/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
    audience: "Gen Z and millennial creatives",
    channels: ["Pinterest", "TikTok"]
  },
  {
    id: "khaki-coded-utility",
    name: "Khaki Coded Utility",
    category: "fashion",
    tags: ["utility", "streetwear", "gorpcore", "gen-z"],
    description: "Adventure-ready khaki — bermuda shorts, multi-pocket vests and utility streetwear — is a Pinterest Predicts 2026 trend built on rising searches for rugged, functional dressing.",
    trajectory: "rising",
    source: "Pinterest Newsroom",
    sourceUrl: "https://newsroom.pinterest.com/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
    audience: "Gen Z and millennial men and women",
    channels: ["Pinterest", "TikTok", "Instagram"]
  },
  {
    id: "the-brooch-revival",
    name: "The Brooch Revival",
    category: "fashion",
    tags: ["accessories", "jewelry", "menswear", "vintage"],
    description: "Vintage pins, crystal clip-ons and heirloom brooches on lapels — notably driven by Boomer and millennial men — are a Pinterest Predicts 2026 accessories trend.",
    trajectory: "rising",
    source: "Pinterest Newsroom",
    sourceUrl: "https://newsroom.pinterest.com/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
    audience: "Boomer and millennial men",
    channels: ["Pinterest", "Editorial"]
  },
  {
    id: "laced-up",
    name: "Laced Up",
    category: "fashion",
    tags: ["lace", "womenswear", "accessories", "romantic"],
    description: "Doilies and lace applied to unexpected pieces — bomber jackets, bandanas, accessories — is a Pinterest Predicts 2026 trend bringing delicate texture into everyday wardrobes.",
    trajectory: "emerging",
    source: "Pinterest Newsroom",
    sourceUrl: "https://newsroom.pinterest.com/news/pinterest-predicts-nonconformity-self-preservation-and-escapism-drive-21-trends-for-2026/",
    audience: "Gen Z and millennial women",
    channels: ["Pinterest", "TikTok"]
  },
  {
    id: "contemporary-bootcut-jeans",
    name: "Contemporary Bootcut Jeans",
    category: "fashion",
    tags: ["denim", "y2k", "womenswear", "budget"],
    description: "A modern take on early-2000s bootcut with a subtle flare is named a key 2026 denim direction as shoppers move past barrel and horseshoe shapes.",
    trajectory: "rising",
    source: "Refinery29",
    sourceUrl: "https://www.refinery29.com/en-us/denim-trends-2026",
    audience: "Gen Z and millennial women",
    channels: ["TikTok", "In-store", "Pinterest"]
  },
  {
    id: "denim-beyond-jeans",
    name: "Denim Beyond Jeans",
    category: "fashion",
    tags: ["denim", "tailoring", "outerwear", "womenswear"],
    description: "Denim expands into sharper non-jean shapes — tailored blazers, bomber jackets, dresses, shoes and bags — as a defining 2026 denim trend with room to grow into 2027.",
    trajectory: "rising",
    source: "Refinery29",
    sourceUrl: "https://www.refinery29.com/en-us/denim-trends-2026",
    audience: "trend-driven women across ages",
    channels: ["In-store", "Pinterest", "Editorial"]
  },
  {
    id: "decorated-carpenter-denim",
    name: "Decorated Carpenter Denim",
    category: "fashion",
    tags: ["denim", "utility", "streetwear", "embellishment"],
    description: "Embellished jeans and utility-inspired carpenter styles are flagged as an increasingly popular 2026 denim direction, adding workwear detail and decoration to basic five-pockets.",
    trajectory: "emerging",
    source: "Refinery29",
    sourceUrl: "https://www.refinery29.com/en-us/denim-trends-2026",
    audience: "Gen Z streetwear shoppers",
    channels: ["TikTok", "Instagram", "In-store"]
  },
  {
    id: "resale-native-shopping",
    name: "Resale-Native Shopping",
    category: "fashion",
    tags: ["resale", "sustainability", "gen-z", "budget"],
    description: "ThredUp's 2026 report projects secondhand hitting $393B by 2030 — growing about twice as fast as overall apparel — powered by 'resale natives' and AI-driven discovery in social feeds.",
    trajectory: "rising",
    source: "WWD",
    sourceUrl: "https://wwd.com/sustainability/business/thredup-2026-resale-report-secondhand-growth-1238871192/",
    audience: "Gen Z shoppers",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "neo-nostalgia-archive-mixing",
    name: "Neo Nostalgia Archive Mixing",
    category: "fashion",
    tags: ["vintage", "resale", "gen-z", "y2k"],
    description: "Depop's 2026 forecast sees shoppers blending archival '70s, '90s and Y2K pieces in personal, non-period-accurate ways for emotional grounding in uncertain times.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/shopping/depop-trend-predictions-2026",
    audience: "Gen Z resale shoppers",
    channels: ["TikTok", "Instagram", "Pinterest"]
  },
  {
    id: "modern-uniform-dressing",
    name: "Modern Uniform Dressing",
    category: "fashion",
    tags: ["capsule-wardrobe", "minimalism", "budget", "workwear"],
    description: "Depop's 2026 trend report predicts quality basics, capsule wardrobes and intentional outfit repetition as shoppers respond to decision fatigue and economic pressure.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/shopping/depop-trend-predictions-2026",
    audience: "budget-conscious Gen Z and millennials",
    channels: ["TikTok", "Pinterest"]
  },
  {
    id: "everyday-ceremony",
    name: "Everyday Ceremony",
    category: "fashion",
    tags: ["occasionwear", "accessories", "romanticism", "gen-z"],
    description: "Depop forecasts shoppers elevating daily routines with tailored coats, draped skirts, metallics, kitten heels and statement jewelry — turning ordinary moments into occasions.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/shopping/depop-trend-predictions-2026",
    audience: "Gen Z women romanticizing daily life",
    channels: ["TikTok", "Pinterest", "Instagram"]
  },
  {
    id: "romanticized-sports",
    name: "Romanticized Sports",
    category: "fashion",
    tags: ["athleisure", "vintage", "sportswear", "gen-z"],
    description: "Vintage-inspired activewear, jerseys, bike shorts and ski layers reimagined as fashion — a Depop 2026 prediction fueled by the growing cultural visibility of women's sports.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/shopping/depop-trend-predictions-2026",
    audience: "Gen Z sports fans",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "wearable-thigh-high-boots",
    name: "Wearable Thigh-High Boots",
    category: "fashion",
    tags: ["footwear", "boots", "womenswear", "luxury"],
    description: "Over-the-knee and thigh-high boots styled practically with coats and leggings appeared at Chloé and Hermès for Fall/Winter 2026, positioning them as next winter's statement boot.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fall-winter-shoe-trends-2026",
    audience: "fashion-forward millennial women",
    channels: ["Editorial", "Instagram", "In-store"]
  },
  {
    id: "bowler-bags",
    name: "Bowler Bags",
    category: "fashion",
    tags: ["accessories", "handbags", "luxury", "revival"],
    description: "Double-strap, trapezoidal satchels resembling modern doctor's bags led the Fall 2026 handbag runways, part of a shift toward structured, carried (not shouldered) bags.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/runway/fall-winter-bag-trends-2026",
    audience: "millennial professionals",
    channels: ["Editorial", "In-store", "Instagram"]
  },
  {
    id: "wedge-heel-comeback",
    name: "Wedge Heel Comeback",
    category: "fashion",
    tags: ["footwear", "y2k", "gen-z", "budget"],
    description: "Early-2000s wedge heels are resurfacing on TikTok with a more refined styling sensibility, named one of 2026's biggest platform-driven footwear trends.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/trends/tiktok-fashion-trends-2026",
    audience: "Gen Z women",
    channels: ["TikTok", "Pinterest"]
  },
  {
    id: "gym-to-street-activewear",
    name: "Gym-to-Street Activewear",
    category: "fashion",
    tags: ["athleisure", "activewear", "sneakers", "everyday"],
    description: "Activewear designed to move seamlessly into daily life — leggings with blazers, bra tops with jeans, plus retro green trainers off the S/S 2026 runways — is set to keep blurring the gym/street line.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/fashion/trends/activewear-trends-2026",
    audience: "active millennial and Gen Z women",
    channels: ["TikTok", "Instagram", "In-store"]
  },
  {
    id: "lip-serum-boom",
    name: "Lip Serum Boom",
    category: "beauty",
    tags: ["skincare", "lip-care", "gen-z", "hybrid"],
    description: "Lips are getting the full skincare treatment, with lip serums the fastest-growing skincare search Spate projects for 2026 (+88.7%). Balms are giving way to targeted peptide and treatment formulas.",
    trajectory: "rising",
    source: "Spate",
    sourceUrl: "https://www.spate.nyc/resources/2026-beauty-wellness-predictions-the-trends-set-to-shape-the-year-ahead",
    audience: "Gen Z and millennial skincare shoppers",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "collagen-masks",
    name: "Collagen Masks",
    category: "beauty",
    tags: ["skincare", "masking", "anti-aging", "k-beauty"],
    description: "Collagen-infused face masks are projected by Spate to grow 52.9% into 2026, riding the longevity wave and K-beauty's overnight-mask formats.",
    trajectory: "emerging",
    source: "Spate",
    sourceUrl: "https://www.spate.nyc/resources/2026-beauty-wellness-predictions-the-trends-set-to-shape-the-year-ahead",
    audience: "Skincare maximalists",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "skin-longevity",
    name: "Skin Longevity",
    category: "beauty",
    tags: ["skincare", "longevity", "wellness", "anti-aging"],
    description: "Anti-aging is being reframed as cellular health and 'pro-aging' longevity, with streamlined routines built around barrier support and long-term skin function rather than quick fixes.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/beauty/skin/2026-skincare-trends",
    audience: "Millennial and Gen X skincare users",
    channels: ["Editorial", "Instagram"]
  },
  {
    id: "microbiome-skincare",
    name: "Microbiome Skincare",
    category: "beauty",
    tags: ["skincare", "microbiome", "ingredients", "science"],
    description: "Probiotic, prebiotic and postbiotic formulas that support the skin's bacterial ecosystem are moving mainstream as consumers focus on inflammation and barrier health.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/beauty/skin/skincare-trends-2026",
    audience: "Sensitive-skin and science-minded consumers",
    channels: ["Editorial", "TikTok"]
  },
  {
    id: "gentle-exfoliation",
    name: "Gentle Exfoliation",
    category: "beauty",
    tags: ["skincare", "ingredients", "barrier-care", "acids"],
    description: "Harsh acid peels are giving way to PHAs, enzymes and mandelic acid that resurface skin without wrecking the barrier — a correction to years of over-exfoliation content.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/beauty/skin/skincare-trends-2026",
    audience: "Recovering skincare over-users",
    channels: ["TikTok", "Editorial"]
  },
  {
    id: "peptide-everything",
    name: "Peptide Everything",
    category: "beauty",
    tags: ["skincare", "wellness", "ingredients", "longevity"],
    description: "Glossy's editors predict a 'huge explosion of peptides' across beauty and wellness in 2026, from next-gen topical peptide serums to peptide therapy crossing over from the longevity world.",
    trajectory: "rising",
    source: "Glossy",
    sourceUrl: "https://www.glossy.co/podcasts/the-glossy-beauty-podcasts-2026-predictions/",
    audience: "Wellness-beauty crossover consumers",
    channels: ["TikTok", "Editorial"]
  },
  {
    id: "inflammation-care",
    name: "Inflammation Care",
    category: "beauty",
    tags: ["skincare", "wellness", "ingredients", "sensitive-skin"],
    description: "Cosmetics Business names inflammation care a top-five 2026 trend: gentle, anti-inflammatory formulas positioned as part of whole-body wellness rather than medical treatment.",
    trajectory: "emerging",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/cosmetics-business-predicts-the-top-5-beauty-trends-1",
    audience: "Sensitive-skin and health-conscious consumers",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "metabolic-beauty",
    name: "Metabolic Beauty",
    category: "beauty",
    tags: ["skincare", "wellness", "beauty-tech", "personalization"],
    description: "Mintel's flagship 2026 prediction: skin and hair treated as the body's most accessible biomarker, with biomarker testing and metabolic health data driving personalized beauty routines.",
    trajectory: "emerging",
    source: "Mintel",
    sourceUrl: "https://www.mintel.com/press-centre/mintel-announces-2026-global-beauty-and-personal-care-predictions/",
    audience: "Health-tracking early adopters",
    channels: ["Editorial", "Instagram"]
  },
  {
    id: "climate-cosmetics",
    name: "Climate Cosmetics",
    category: "beauty",
    tags: ["skincare", "climate", "innovation", "spf"],
    description: "Environment-specific formulas built for humidity, heat waves and extreme weather, as brands start designing products around regional climate stress rather than skin type alone.",
    trajectory: "emerging",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-future-forecast-report-what-brands-must-know-for-2026",
    audience: "Consumers in extreme-weather regions",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "hybrid-spf-formats",
    name: "Hybrid SPF Formats",
    category: "beauty",
    tags: ["skincare", "spf", "hybrid", "suncare"],
    description: "Sunscreen is being rebuilt as an everyday beauty product — tinted hybrids, mists, sticks and skincare-SPF blends — as daily UV protection becomes a year-round habit.",
    trajectory: "rising",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/spf-trends-in-2026",
    audience: "Daily-SPF converts across ages",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "k-beauty-second-wave",
    name: "K-Beauty Second Wave",
    category: "beauty",
    tags: ["skincare", "k-beauty", "budget", "innovation"],
    description: "Korean beauty is in a second US boom, per Circana, driven by affordable, texture-forward skincare and sunscreens discovered on TikTok and now expanding into mainstream retail.",
    trajectory: "peaking-next-year",
    source: "Circana",
    sourceUrl: "https://www.circana.com/post/the-second-coming-of-k-beauty",
    audience: "Gen Z and millennial value shoppers",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "bold-color-comeback",
    name: "Bold Color Comeback",
    category: "beauty",
    tags: ["makeup", "color", "self-expression", "gen-z"],
    description: "The 'clean girl' minimal look is fading as consumers embrace bold eyes and pop-color lips — neons, reds and metallics in wearable textures as a form of self-expression.",
    trajectory: "peaking-next-year",
    source: "Beauty Independent",
    sourceUrl: "https://www.beautyindependent.com/big-makeup-trends-matter-2026-those-that-dont/",
    audience: "Gen Z women and makeup artists",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "glitchy-glam",
    name: "Glitchy Glam",
    category: "beauty",
    tags: ["makeup", "nails", "gen-z", "maximalism"],
    description: "Pinterest Predicts 2026 flags intentionally imperfect, asymmetric beauty — mismatched nails and 'eccentric makeup' (+100% searches) — as a rejection of algorithmic perfection.",
    trajectory: "emerging",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/pinterest-2026-beauty-trend-predictions-glitchy-glam-and-cool-blue",
    audience: "Gen Z creatives",
    channels: ["Pinterest", "TikTok"]
  },
  {
    id: "cool-blue-beauty",
    name: "Cool Blue Beauty",
    category: "beauty",
    tags: ["makeup", "color", "gen-z", "nails"],
    description: "Icy, frosted tones are Pinterest's breakout 2026 palette, with 'frosted makeup' searches up 150% — cooling blues and soft-focus shimmer across eyes, nails and hair.",
    trajectory: "emerging",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/pinterest-2026-beauty-trend-predictions-glitchy-glam-and-cool-blue",
    audience: "Gen Z trend-setters",
    channels: ["Pinterest", "Instagram"]
  },
  {
    id: "gummy-jelly-textures",
    name: "Gummy Jelly Textures",
    category: "beauty",
    tags: ["makeup", "texture", "gen-z", "skincare"],
    description: "Squishy, jelly and gummy finishes are taking over formats from blush to nails — Pinterest reports 'jelly blush' searches up 130% under its 'Gimme Gummy' 2026 prediction.",
    trajectory: "rising",
    source: "Professional Beauty",
    sourceUrl: "https://professionalbeauty.co.uk/pinterest-predicts-2026-beauty-wellness-trends",
    audience: "Gen Z texture-seekers",
    channels: ["Pinterest", "TikTok"]
  },
  {
    id: "vamp-romantic",
    name: "Vamp Romantic",
    category: "beauty",
    tags: ["makeup", "nails", "gothic", "gen-z"],
    description: "Moody, glossy dark glamour is building for 2026 — Pinterest tracks 'dark romantic makeup' up 160% and gothic coffin nails up 180% as maximalist gothic aesthetics go mainstream.",
    trajectory: "emerging",
    source: "Professional Beauty",
    sourceUrl: "https://professionalbeauty.co.uk/pinterest-predicts-2026-beauty-wellness-trends",
    audience: "Gen Z alt-beauty fans",
    channels: ["Pinterest", "TikTok"]
  },
  {
    id: "statement-blush",
    name: "Statement Blush",
    category: "beauty",
    tags: ["makeup", "blush", "technique", "gen-z"],
    description: "Cheeks replace contour as the face's focal point, with lifted placement and temple-blended blush becoming the defining technique of 2026 makeup.",
    trajectory: "rising",
    source: "Beauty Independent",
    sourceUrl: "https://www.beautyindependent.com/big-makeup-trends-matter-2026-those-that-dont/",
    audience: "Gen Z and millennial makeup wearers",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "makeup-longevity-hybrids",
    name: "Makeup-Longevity Hybrids",
    category: "beauty",
    tags: ["makeup", "skincare", "hybrid", "ingredients"],
    description: "Color cosmetics are absorbing skin-biology actives like NAD+ and collagen boosters, so foundation and blush double as long-term skin treatment.",
    trajectory: "emerging",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-makeup-trends-set-to-define-2026",
    audience: "Skincare-first makeup buyers",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "diy-cluster-lashes",
    name: "DIY Cluster Lashes",
    category: "beauty",
    tags: ["makeup", "lashes", "budget", "gen-z"],
    description: "At-home cluster lash extensions are Spate's fastest-growing makeup search for 2026 (+92.6%) as consumers swap salon appointments for DIY lash kits.",
    trajectory: "rising",
    source: "Spate",
    sourceUrl: "https://www.spate.nyc/resources/2026-beauty-wellness-predictions-the-trends-set-to-shape-the-year-ahead",
    audience: "Budget-conscious Gen Z women",
    channels: ["TikTok", "YouTube"]
  },
  {
    id: "live-selling-beauty",
    name: "Live-Selling Beauty",
    category: "beauty",
    tags: ["retail", "makeup", "social-commerce", "tiktok-shop"],
    description: "Products are being designed for live social commerce — demonstrable textures and sensory payoffs built for TikTok Shop-style real-time selling.",
    trajectory: "emerging",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-makeup-trends-set-to-define-2026",
    audience: "TikTok Shop shoppers",
    channels: ["TikTok"]
  },
  {
    id: "scalp-care-as-skincare",
    name: "Scalp Care as Skincare",
    category: "beauty",
    tags: ["haircare", "scalp", "wellness", "ingredients"],
    description: "Serums, exfoliants and massage tools for the scalp are set to dominate haircare in 2026 as 'skinification' extends above the hairline and hair health gets traced to the root.",
    trajectory: "rising",
    source: "Cosmetics in Mind",
    sourceUrl: "https://cosmeticsinmind.com/en/scalp-care-haircare-trend-beauty-market-2026/",
    audience: "Hair-loss-aware millennials and Gen Z",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "color-drenching-hair",
    name: "Color Drenching Hair",
    category: "beauty",
    tags: ["haircare", "hair-color", "salon", "maximalism"],
    description: "Single-shade, root-to-tip saturated hair color — deep reds, inky blacks, silvery platinums — replaces dimensional highlights as 2026's defining color technique.",
    trajectory: "rising",
    source: "The Zoe Report",
    sourceUrl: "https://www.thezoereport.com/beauty/2026-hair-trends",
    audience: "Salon color clients",
    channels: ["Instagram", "Pinterest"]
  },
  {
    id: "the-new-shag",
    name: "The New Shag",
    category: "beauty",
    tags: ["haircare", "haircuts", "texture", "low-maintenance"],
    description: "Tousled, airy shags and textured French bobs with flipped ends lead 2026 cut trends, favoring movement and lived-in texture over precision styling.",
    trajectory: "rising",
    source: "The Zoe Report",
    sourceUrl: "https://www.thezoereport.com/beauty/2026-hair-trends",
    audience: "Cool-girl salon clients",
    channels: ["Pinterest", "Instagram"]
  },
  {
    id: "prestige-salon-haircare",
    name: "Prestige Salon Haircare",
    category: "beauty",
    tags: ["haircare", "luxury", "salon", "premiumization"],
    description: "Prestige haircare was the fastest-growing prestige beauty category (+8%) per Circana, as consumers trade up to salon and stylist-founded brands they trust.",
    trajectory: "rising",
    source: "WWD",
    sourceUrl: "https://wwd.com/beauty-industry-news/beauty-features/circana-2025-beauty-mass-prestige-trends-2026-1238555852/",
    audience: "Salon loyalists trading up",
    channels: ["In-store", "TikTok"]
  },
  {
    id: "scent-stacking",
    name: "Scent Stacking",
    category: "beauty",
    tags: ["fragrance", "personalization", "gen-z", "collecting"],
    description: "Layering multiple perfumes into a bespoke signature is a Pinterest Predicts 2026 headline trend, with 'niche perfume collection' searches up 500%.",
    trajectory: "peaking-next-year",
    source: "Professional Beauty",
    sourceUrl: "https://professionalbeauty.co.uk/pinterest-predicts-2026-beauty-wellness-trends",
    audience: "Gen Z fragrance collectors",
    channels: ["Pinterest", "TikTok"]
  },
  {
    id: "grown-up-gourmand",
    name: "Grown-Up Gourmand",
    category: "beauty",
    tags: ["fragrance", "gourmand", "savory", "luxury"],
    description: "Gourmand fragrance is maturing from sugary sweetness into savory, nutty accords — pistachio, sesame, cream — named a top-five 2026 trend by Cosmetics Business.",
    trajectory: "rising",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/cosmetics-business-predicts-the-top-5-beauty-trends-1",
    audience: "Fragrance enthusiasts",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "oud-arabian-inspired-perfume",
    name: "Oud & Arabian-Inspired Perfume",
    category: "beauty",
    tags: ["fragrance", "oud", "niche", "luxury"],
    description: "Middle Eastern perfumery — oud, amber, rich attars — is a major growth engine in Western fragrance, with Spate tracking oud perfume searches up 43.9% into 2026.",
    trajectory: "rising",
    source: "Spate",
    sourceUrl: "https://www.spate.nyc/reports/2026-fragrance-report-key-trends-brands-and-scents",
    audience: "Fragrance collectors and PerfumeTok",
    channels: ["TikTok", "YouTube"]
  },
  {
    id: "elevated-mass-fragrance",
    name: "Elevated Mass Fragrance",
    category: "beauty",
    tags: ["fragrance", "budget", "body-mist", "masstige"],
    description: "Mass fragrance grew 15% in 2025 — the only double-digit beauty category per Circana — as body mists and luxe-inspired affordable scents pull younger shoppers into fragrance.",
    trajectory: "peaking-next-year",
    source: "WWD",
    sourceUrl: "https://wwd.com/beauty-industry-news/beauty-features/circana-2025-beauty-mass-prestige-trends-2026-1238555852/",
    audience: "Gen Z and teen fragrance buyers",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "neuro-mood-scents",
    name: "Neuro & Mood Scents",
    category: "beauty",
    tags: ["fragrance", "wellness", "neuroscience", "functional"],
    description: "Functional fragrance designed to regulate mood and emotion is central to Mintel's 'Sensorial Synergy' 2026 prediction, backed by neuroscience rather than vague wellness claims.",
    trajectory: "emerging",
    source: "Mintel",
    sourceUrl: "https://www.mintel.com/press-centre/mintel-announces-2026-global-beauty-and-personal-care-predictions/",
    audience: "Wellness-oriented fragrance buyers",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "korean-bodycare",
    name: "Korean Bodycare",
    category: "beauty",
    tags: ["body-care", "k-beauty", "skinification", "barrier-care"],
    description: "K-beauty principles — layering, gentle exfoliation, barrier repair — are moving below the neck, blurring the line between face and body skincare.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/beauty/skin/skincare-trends-2026",
    audience: "Body-care upgraders",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "milk-bath-nails",
    name: "Milk Bath Nails",
    category: "beauty",
    tags: ["nails", "quiet-luxury", "neutrals", "minimalism"],
    description: "Soft milky whites are set to replace ballet pink as the default clean manicure in 2026, per manicurists — a quiet-luxury shift echoed by Pantone's Cloud Dancer.",
    trajectory: "rising",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/beauty/nails/2026-nail-trends",
    audience: "Minimalist manicure clients",
    channels: ["Pinterest", "Instagram"]
  },
  {
    id: "3d-gummy-nails",
    name: "3D Gummy Nails",
    category: "beauty",
    tags: ["nails", "texture", "gen-z", "nail-art"],
    description: "Jelly-like 3D textures and sheer neon finishes are the nail world's next art moment, with celebrity manicurists predicting they'll stick through 2026 and beyond.",
    trajectory: "emerging",
    source: "Who What Wear",
    sourceUrl: "https://www.whowhatwear.com/beauty/nails/2026-nail-trends",
    audience: "Gen Z nail-art fans",
    channels: ["TikTok", "Pinterest"]
  },
  {
    id: "press-on-nail-expansion",
    name: "Press-On Nail Expansion",
    category: "beauty",
    tags: ["nails", "budget", "diy", "retail"],
    description: "Press-ons keep growing as a low-commitment, salon-quality alternative — BeautyMatter notes search interest expanding into new demographics, including kids' lines (+17% in 2025).",
    trajectory: "rising",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-makeup-trends-set-to-define-2026",
    audience: "Budget-conscious DIY manicure fans",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "beauty-patches-2-0",
    name: "Beauty Patches 2.0",
    category: "beauty",
    tags: ["beauty-tech", "skincare", "wearables", "innovation"],
    description: "Patches are evolving from pimple stickers into wearable beauty tech — vitamin-infused, UV-sensing and treatment-delivering formats worn as accessories.",
    trajectory: "emerging",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-future-forecast-report-what-brands-must-know-for-2026",
    audience: "Gen Z skincare experimenters",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "ingestible-beauty-stack",
    name: "Ingestible Beauty Stack",
    category: "beauty",
    tags: ["wellness", "supplements", "ingestibles", "longevity"],
    description: "Beauty-from-within accelerates, with Spate projecting big 2026 growth in clear protein (+54.7%), inositol (+53.2%) and shilajit gummies (+48%) as supplements merge with beauty routines.",
    trajectory: "rising",
    source: "Spate",
    sourceUrl: "https://www.spate.nyc/resources/2026-beauty-wellness-predictions-the-trends-set-to-shape-the-year-ahead",
    audience: "Wellness-first beauty consumers",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "the-manissance",
    name: "The Manissance",
    category: "beauty",
    tags: ["mens-grooming", "skincare", "fragrance", "gen-z"],
    description: "Men's beauty spending grew 9.9% in 2024 — outpacing women's — with 68% of Gen Z men now skincare users; WGSN projects a $115.3B men's grooming market by 2028.",
    trajectory: "rising",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/inside-the-manissance-why-men-s-grooming-is-gearing",
    audience: "Gen Z and millennial men",
    channels: ["TikTok", "YouTube"]
  },
  {
    id: "at-home-light-therapy",
    name: "At-Home Light Therapy",
    category: "beauty",
    tags: ["beauty-tech", "devices", "skincare", "premium"],
    description: "LED masks are graduating into a full device category, with L'Oréal planning new infrared light devices as at-home light therapy shifts from niche gadget to mainstream skincare step.",
    trajectory: "rising",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/lor%C3%A9al-to-shake-up-beauty-tech-market-with-new-infrared-light-devices",
    audience: "Skincare device investors",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "magnificent-minis",
    name: "Magnificent Minis",
    category: "beauty",
    tags: ["retail", "minis", "budget", "gen-z"],
    description: "Mini formats are a defining 2026 retail play — low-risk 'little treat' purchases that drive trial and impulse buys, with Sephora and Target expanding mini assortments.",
    trajectory: "peaking-next-year",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-future-forecast-report-what-brands-must-know-for-2026",
    audience: "Budget-stretched Gen Z shoppers",
    channels: ["In-store", "TikTok"]
  },
  {
    id: "dupe-culture-normalized",
    name: "Dupe Culture Normalized",
    category: "beauty",
    tags: ["retail", "budget", "dupes", "gen-z"],
    description: "Glossy reports prestige beauty has effectively 'lost the war on dupes' — affordable alternatives are now a socially accepted default, forcing luxury brands to compete on experience instead.",
    trajectory: "peaking-next-year",
    source: "Glossy",
    sourceUrl: "https://www.glossy.co/beauty/prestige-beauty-lost-the-war-on-dupes-so-what-happens-now/",
    audience: "Value-driven Gen Z and millennials",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "refill-first-packaging",
    name: "Refill-First Packaging",
    category: "beauty",
    tags: ["retail", "sustainability", "packaging", "clean-beauty"],
    description: "Refillable and compostable packaging moves from marketing gesture to core product design in 2026, as brands respond to regulation and waste-wary shoppers.",
    trajectory: "rising",
    source: "BeautyMatter",
    sourceUrl: "https://beautymatter.com/articles/the-beauty-packaging-trends-set-to-define-2026",
    audience: "Sustainability-minded consumers",
    channels: ["In-store", "Editorial"]
  },
  {
    id: "resilient-beauty",
    name: "Resilient Beauty",
    category: "beauty",
    tags: ["skincare", "haircare", "durability", "barrier-care"],
    description: "Cosmetics Business calls resilience 'the new watchword' for 2026: long-term skin support, hair strength and recovery, and durable makeup built for stress and climate volatility.",
    trajectory: "emerging",
    source: "Cosmetics Business",
    sourceUrl: "https://cosmeticsbusiness.com/cosmetics-business-predicts-the-top-5-beauty-trends-1",
    audience: "Pragmatic beauty consumers",
    channels: ["Editorial", "In-store"]
  },
  {
    id: "throwback-kid",
    name: "Throwback Kid",
    category: "culture",
    tags: ["nostalgia", "millennials", "parenting", "retro", "family"],
    description: "Millennial parents recreating their own childhoods through vintage toys, retro nursery decor and 1970s-90s-inspired kidswear — opening a nostalgia lane for family and mini-me product lines.",
    trajectory: "emerging",
    source: "Pinterest Predicts 2026 (via Envato)",
    sourceUrl: "https://elements.envato.com/learn/pinterest-predicts-trends",
    audience: "Millennial parents",
    channels: ["Pinterest", "Instagram", "In-store"]
  },
  {
    id: "operasthetic",
    name: "Operasthetic",
    category: "culture",
    tags: ["event-dressing", "occasionwear", "maximalism", "weddings"],
    description: "Theatrical, opera-inspired dressing for weddings and events — heavy fabrics, reds, golds, cabaret detail — as consumers treat gatherings as full production moments worth dressing up for.",
    trajectory: "emerging",
    source: "Pinterest Predicts 2026 (via nss magazine)",
    sourceUrl: "https://www.nssmag.com/en/lifestyle/43770/pinterest-predicts-2026-aesthetic-trends",
    audience: "Event and wedding guests",
    channels: ["Pinterest", "Instagram", "Editorial"]
  },
  {
    id: "the-ai-shopper",
    name: "The AI Shopper",
    category: "culture",
    tags: ["ai", "discovery", "e-commerce", "search", "agentic-commerce"],
    description: "Consumers increasingly discover and compare fashion through AI assistants, with autonomous agents expected to start making purchases on shoppers' behalf — forcing brands to optimize for machine as well as human discovery.",
    trajectory: "rising",
    source: "McKinsey / BoF, The State of Fashion 2026",
    sourceUrl: "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion",
    audience: "Digitally native shoppers",
    channels: ["Editorial", "TikTok"]
  },
  {
    id: "jewelry-sparks",
    name: "Jewelry Sparks",
    category: "culture",
    tags: ["jewelry", "self-gifting", "investment", "accessories"],
    description: "Jewelry unit sales are outpacing every other fashion category, driven by demand for long-lasting pieces and a growing self-gifting habit across demographics.",
    trajectory: "rising",
    source: "McKinsey / BoF, The State of Fashion 2026",
    sourceUrl: "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion",
    audience: "Self-gifting women and value-minded shoppers",
    channels: ["In-store", "Instagram", "Editorial"]
  },
  {
    id: "smart-frames",
    name: "Smart Frames",
    category: "culture",
    tags: ["wearables", "eyewear", "tech", "accessories", "ai"],
    description: "AI-enabled smart glasses are emerging as the breakout wearable, projected to top $30 billion by 2030 — turning eyewear into a fashion-tech category brands can style and collaborate on.",
    trajectory: "emerging",
    source: "McKinsey / BoF, The State of Fashion 2026",
    sourceUrl: "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion",
    audience: "Early-adopter urban consumers",
    channels: ["In-store", "YouTube", "Editorial"]
  },
  {
    id: "the-well-being-era",
    name: "The Well-Being Era",
    category: "culture",
    tags: ["wellness", "spending-shift", "health", "identity"],
    description: "Well-being is becoming central to how consumers live, spend and define themselves, redirecting discretionary dollars from apparel toward wellness — pushing fashion and beauty brands to build health and self-care into their offer.",
    trajectory: "rising",
    source: "McKinsey / BoF, The State of Fashion 2026",
    sourceUrl: "https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion",
    audience: "Wellness-first consumers across ages",
    channels: ["Instagram", "In-store", "Editorial"]
  },
  {
    id: "reali-tea",
    name: "Reali-TEA",
    category: "culture",
    tags: ["authenticity", "anti-ai", "community", "storytelling"],
    description: "TikTok forecasts audiences abandoning escapism for grounded, human, imperfect content in 2026 — rewarding brands that show real people and real-time cultural responsiveness over polished AI-generated gloss.",
    trajectory: "emerging",
    source: "TikTok Next 2026",
    sourceUrl: "https://newsroom.tiktok.com/introducing-tiktok-next-2026-our-trend-forecast-for-marketers-for-the-year-ahead?lang=en",
    audience: "Gen Z and millennial scrollers",
    channels: ["TikTok"]
  },
  {
    id: "curiosity-detours",
    name: "Curiosity Detours",
    category: "culture",
    tags: ["social-search", "discovery", "creator-economy", "gen-z"],
    description: "Passive scrolling is giving way to intentional searching on social platforms, with users following discovery rabbit holes across categories — making creator content the new storefront window for fashion and beauty.",
    trajectory: "rising",
    source: "TikTok Next 2026",
    sourceUrl: "https://newsroom.tiktok.com/introducing-tiktok-next-2026-our-trend-forecast-for-marketers-for-the-year-ahead?lang=en",
    audience: "Social-first searchers under 35",
    channels: ["TikTok", "YouTube"]
  },
  {
    id: "emotional-roi",
    name: "Emotional ROI",
    category: "culture",
    tags: ["intentional-shopping", "creator-economy", "value", "trust"],
    description: "Impulse buying is losing to intention: shoppers validate purchases through trusted creators and reward brands that justify the 'why to buy' with meaning, not just price — a shift in how conversion happens on social.",
    trajectory: "rising",
    source: "TikTok Next 2026",
    sourceUrl: "https://newsroom.tiktok.com/introducing-tiktok-next-2026-our-trend-forecast-for-marketers-for-the-year-ahead?lang=en",
    audience: "Deliberate Gen Z and millennial buyers",
    channels: ["TikTok", "Instagram"]
  },
  {
    id: "gen-alpha-reshapes-beauty",
    name: "Gen Alpha Reshapes Beauty",
    category: "culture",
    tags: ["gen-alpha", "beauty", "retail", "tweens", "next-gen"],
    description: "After arriving as beauty consumers in 2025, Gen Alpha is expected to actively reshape the industry in 2026 — with brands building age-appropriate products, packaging and retail experiences for tweens and their parents.",
    trajectory: "rising",
    source: "Glossy",
    sourceUrl: "https://www.glossy.co/beauty/in-2025-gen-alpha-arrived-as-beauty-consumers-in-2026-they-will-reshape-the-industry/",
    audience: "Gen Alpha tweens and their parents",
    channels: ["TikTok", "In-store", "YouTube"]
  },
  {
    id: "body-mist-hair-perfume-boom",
    name: "Body Mist & Hair Perfume Boom",
    category: "culture",
    tags: ["fragrance", "gen-alpha", "gen-z", "affordable-luxury", "beauty"],
    description: "Gen Z and Gen Alpha are driving an explosion in body mists and hair perfumes — cheaper, layerable, collectible entry points into fragrance that brands from mass to prestige are racing to launch.",
    trajectory: "rising",
    source: "Glossy",
    sourceUrl: "https://www.glossy.co/pop/inside-the-gen-z-gen-alpha-hair-perfume-and-body-mist-explosion/",
    audience: "Gen Z and Gen Alpha girls",
    channels: ["TikTok", "In-store"]
  },
  {
    id: "sleep-wellness-retail",
    name: "Sleep Wellness Retail",
    category: "culture",
    tags: ["wellness", "sleep", "beauty", "product-expansion"],
    description: "Sleep has become a full consumer category — from sleepmaxxing routines to sleep-adjacent beauty, supplements and textiles — giving beauty and lifestyle brands a nighttime shelf to own.",
    trajectory: "rising",
    source: "Glossy",
    sourceUrl: "https://www.glossy.co/beauty/inside-the-wide-and-growing-world-of-sleep-wellness/",
    audience: "Wellness-focused millennials and Gen Z",
    channels: ["TikTok", "In-store", "Editorial"]
  },
  {
    id: "over-optimization-backlash",
    name: "Over-Optimization Backlash",
    category: "culture",
    tags: ["wellness", "anti-hustle", "connection", "mental-health"],
    description: "A counter-move against biohacking and metric-obsessed self-optimization: consumers shifting toward feeling safe, connected and alive — an opening for brands selling comfort, softness and community over performance.",
    trajectory: "emerging",
    source: "Global Wellness Summit",
    sourceUrl: "https://globalwellnessinstitute.org/press-room/press-releases/global-wellness-summit-releases-10-wellness-trends-for-2026/",
    audience: "Burned-out millennials and Gen Z",
    channels: ["Instagram", "Editorial"]
  },
  {
    id: "festivalization-of-wellness",
    name: "Festivalization of Wellness",
    category: "culture",
    tags: ["events", "community", "wellness", "experiential"],
    description: "Group wellness events built on movement, music and collective energy are replacing solo routines — creating festival-style moments brands can sponsor, outfit and merchandise.",
    trajectory: "emerging",
    source: "Global Wellness Summit",
    sourceUrl: "https://globalwellnessinstitute.org/press-room/press-releases/global-wellness-summit-releases-10-wellness-trends-for-2026/",
    audience: "Social wellness seekers under 40",
    channels: ["Instagram", "TikTok", "In-store"]
  },
  {
    id: "women-s-sports-style-economy",
    name: "Women's Sports Style Economy",
    category: "culture",
    tags: ["sports", "fandom", "womenswear", "merch", "community"],
    description: "Women's athletics moving from margins to mainstream is reshaping fitness culture, media and merch — with fan apparel, athlete style and game-day dressing becoming a fast-growing fashion lane.",
    trajectory: "rising",
    source: "Global Wellness Summit",
    sourceUrl: "https://globalwellnessinstitute.org/press-room/press-releases/global-wellness-summit-releases-10-wellness-trends-for-2026/",
    audience: "Women's sports fans and athletes",
    channels: ["Instagram", "TikTok", "In-store"]
  },
  {
    id: "third-space-retail",
    name: "Third-Space Retail",
    category: "culture",
    tags: ["community", "experiential", "irl", "loyalty", "retail"],
    description: "Brands are turning stores and events into 'third spaces' — cafes, clubs and hangouts where community is the currency — as loneliness and digital fatigue push consumers to seek belonging IRL.",
    trajectory: "rising",
    source: "Forbes",
    sourceUrl: "https://www.forbes.com/sites/oliviashalhoup/2026/07/29/community-as-the-new-currency-inside-2026s-third-space-boom/",
    audience: "Gen Z and millennials seeking IRL connection",
    channels: ["In-store", "Instagram"]
  },
  {
    id: "sober-curious-social-life",
    name: "Sober-Curious Social Life",
    category: "culture",
    tags: ["sober-curious", "gen-z", "wellness", "beverages", "events"],
    description: "Americans are drinking less and building social lives around non-alcoholic options — a lifestyle shift that changes event formats, hosting culture and what 'going out' looks like for younger consumers brands want to reach.",
    trajectory: "rising",
    source: "Datassential",
    sourceUrl: "https://datassential.com/resource/non-alcoholic-beverage-trends/",
    audience: "Gen Z and health-conscious millennials",
    channels: ["In-store", "Instagram", "TikTok"]
  },
  {
    id: "post-labubu-charm-culture",
    name: "Post-Labubu Charm Culture",
    category: "culture",
    tags: ["accessories", "personalization", "collectibles", "gen-z", "nostalgia"],
    description: "Bag charms and collectible trinkets are evolving past Labubu into a broader personalization wave, with new characters and custom charms competing to be the next attachment economy hit.",
    trajectory: "peaking-next-year",
    source: "WWD",
    sourceUrl: "https://wwd.com/fashion-news/fashion-scoops/next-labubu-new-bag-charms-1238933183/",
    audience: "Gen Z collectors and accessorizers",
    channels: ["TikTok", "In-store", "Instagram"]
  },
  {
    id: "boom-boom-aesthetic",
    name: "Boom Boom Aesthetic",
    category: "culture",
    tags: ["maximalism", "luxury", "80s-revival", "power-dressing"],
    description: "The successor to quiet luxury: a loud, 1980s-excess-inspired look of sculpted shoulders, bold color and conspicuous glamour, rising as consumers dress up against economic and cultural anxiety.",
    trajectory: "rising",
    source: "nss G-Club",
    sourceUrl: "https://www.nssgclub.com/en/fashion/40897/boom-boom-aesthetic-return-80s-meaning",
    audience: "Trend-forward city dressers",
    channels: ["Instagram", "Editorial", "TikTok"]
  },
  {
    id: "silver-spenders",
    name: "Silver Spenders",
    category: "culture",
    tags: ["demographics", "over-50", "luxury", "spending-power"],
    description: "Wealthy over-50 consumers are becoming a primary growth engine for fashion, beauty and luxury, holding outsized spending power while brands still over-index marketing on the young.",
    trajectory: "rising",
    source: "CNBC",
    sourceUrl: "https://www.cnbc.com/2025/12/28/wealthy-silver-spenders-are-now-driving-investment-opportunities.html",
    audience: "Affluent consumers 50+",
    channels: ["In-store", "Editorial"]
  },
  {
    id: "social-commerce-goes-mainstream",
    name: "Social Commerce Goes Mainstream",
    category: "culture",
    tags: ["social-commerce", "tiktok-shop", "live-shopping", "creator-economy"],
    description: "TikTok Shop is driving US social commerce toward an $87 billion-plus market, normalizing in-feed and live shopping — making entertainment-led selling a core channel rather than an experiment for fashion and beauty.",
    trajectory: "rising",
    source: "Retail Dive",
    sourceUrl: "https://www.retaildive.com/news/tiktok-shop-drives-social-commerce-growth/807665/",
    audience: "Gen Z and millennial social shoppers",
    channels: ["TikTok", "Instagram", "YouTube"]
  }
];

export const TREND_POOL_IDS = TREND_POOL.map((t) => t.id);

export function trendById(id: string): PoolTrend | undefined {
  return TREND_POOL.find((t) => t.id === id);
}

// A compact, prompt-friendly rendering of the pool for the matching routes.
export function poolForPrompt(excludeIds: string[] = []): string {
  return TREND_POOL.filter((t) => !excludeIds.includes(t.id))
    .map(
      (t) =>
        t.id +
        " | " +
        t.name +
        " [" +
        t.category +
        ", " +
        t.trajectory +
        "] tags: " +
        t.tags.join(", ") +
        " | " +
        t.description +
        " (Source: " +
        t.source +
        ") Audience: " +
        t.audience
    )
    .join("\n");
}
