import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, ArrowRight, CheckCircle, Leaf } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  const perks = [
    {
      title: 'Instant Delivery',
      Icon: ArrowDownToLine,
      description:
        'Get your assets delivered to your email in seconds and download them right away.',
    },
    {
      title: 'Guaranteed Quality',
      Icon: CheckCircle,
      description:
        'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
    },
    {
      title: 'For the Planet',
      Icon: Leaf,
      description:
        "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
    },
  ]
  return (
    <>
      <MaxWidthWrapper>
        <section className="max-w-3xl py-20 m-auto mt-6 text-center flex flex-col gap-4">
          <h1 className="text-5xl text-gray-900 font-bold tracking-tight sm:text-6xl">
            Your marketplace for high-quality 
            <span className="text-blue-600"> digital assets</span>.
          </h1>
          <p className="text-lg max-w-prose text-muted-foreground">
              Welcome to DigitalHippo. Every asset on our
              platform is verified by our team to ensure our
              highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={'/products'} className={buttonVariants()}> browse trending</Link>
            <Button variant={'ghost'} className="flex  items-center">
              Our quality promise <ArrowRight aria-hidden={true} className="w-4 h-3"/>
            </Button>
          </div>
        </section>
        <ProductReel 
          title="Brand new"  
          href="/products?sort=createdAt" 
          query={{limit: 5, sort: '-createdAt'}} 
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50 py-20 ">
        <MaxWidthWrapper >
          <div className=" grid grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] gap-16 gap-y-8 justify-center">
            {perks.map((perk, i)=>(
              <article key={i} className="flex flex-col items-center gap-2 text-center">
                <div className=" h-16 w-16 bg-blue-100 text-blue-900 flex justify-center items-center rounded-full">
                  {<perk.Icon className="w-1/3 h-1/3"/>}
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  {perk.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </article>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}