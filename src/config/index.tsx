export const PRODUCT_CATEGORIES = [
  {
    name: 'Ui Kit',
    value: 'ui_kit' as const,
    items: [
      {
        name: 'Editor picks',
        href: `/products?category=ui_kit`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=ui_kit&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=ui_kit',
        imageSrc: '/nav/ui-kits/purple.jpg',
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
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=icons&sort=desc',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=icons',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  }
]

export const FEE = 1

export const digitalHippoEmail = 'onboarding@resend.dev'