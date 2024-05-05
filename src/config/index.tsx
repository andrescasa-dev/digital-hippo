export const PRODUCT_CATEGORIES = [
  {
    name: 'Ui Kit',
    value: 'ui_kit' as const,
    items: [
      {
        name: 'Editor picks',
        href: `/products?category=ui_kit`,
        imageSrc: '/nav/ui-kits/mixed.webp',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=ui_kit&sort=desc',
        imageSrc: '/nav/ui-kits/blue.webp',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=ui_kit',
        imageSrc: '/nav/ui-kits/purple.webp',
      },
    ]
  },
  {
    name: 'Icons',
    value: 'icons' as const,
    items: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=icons`,
        imageSrc: '/nav/icons/picks.webp',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/nav/icons/new.webp',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/bestsellers.webp',
      },
    ],
  }
]

export const FEE = 1

export const digitalHippoEmail = 'onboarding@resend.dev'