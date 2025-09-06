import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { portfolioCategories } from '@/lib/config';

const portfolioSamples = [
  {
    id: 1,
    category: 'weddings',
    title: 'Sarah & Michael\'s Garden Wedding',
    image: 'https://placehold.co/600x400?text=Beautiful+Garden+Wedding+Ceremony+Outdoor+Natural+Lighting+Romantic',
    alt: 'Beautiful garden wedding ceremony with outdoor natural lighting and romantic atmosphere'
  },
  {
    id: 2,
    category: 'portraits',
    title: 'Executive Headshots',
    image: 'https://placehold.co/600x400?text=Professional+Executive+Headshots+Studio+Lighting+Business+Portrait',
    alt: 'Professional executive headshots with studio lighting for business portraits'
  },
  {
    id: 3,
    category: 'family',
    title: 'The Johnson Family',
    image: 'https://placehold.co/600x400?text=Family+Portrait+Session+Natural+Outdoor+Setting+Happy+Moments',
    alt: 'Family portrait session in natural outdoor setting capturing happy moments'
  },
  {
    id: 4,
    category: 'events',
    title: 'Corporate Launch Event',
    image: 'https://placehold.co/600x400?text=Corporate+Event+Photography+Professional+Business+Gathering+Networking',
    alt: 'Corporate event photography capturing professional business gathering and networking'
  },
  {
    id: 5,
    category: 'lifestyle',
    title: 'Lifestyle Photography',
    image: 'https://placehold.co/600x400?text=Lifestyle+Photography+Candid+Moments+Natural+Expression+Creative',
    alt: 'Lifestyle photography capturing candid moments with natural expressions and creative composition'
  },
  {
    id: 6,
    category: 'weddings',
    title: 'Emma & David\'s Beach Wedding',
    image: 'https://placehold.co/600x400?text=Beach+Wedding+Photography+Sunset+Ocean+Romantic+Destination+Wedding',
    alt: 'Beach wedding photography with sunset ocean backdrop for romantic destination wedding'
  }
];

export function PortfolioPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recent Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Each photograph tells a unique story. Browse through our recent work 
            and see how we capture the essence of every special moment.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant="outline"
              className="bg-primary text-white border-primary hover:bg-primary/90"
            >
              All Work
            </Button>
            {portfolioCategories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/portfolio?category=${category.slug}`}
              >
                <Button variant="outline" className="hover:bg-gray-100">
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioSamples.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href={`/portfolio/${item.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.backgroundColor = '#f3f4f6';
                      target.style.display = 'flex';
                      target.style.alignItems = 'center';
                      target.style.justifyContent = 'center';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 text-xs font-semibold rounded-full">
                      {portfolioCategories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">View Gallery →</p>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/portfolio">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              View Full Portfolio
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-2">12+</div>
            <div className="text-gray-600">Photography Awards</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600">Client Referrals</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-primary mb-2">100K+</div>
            <div className="text-gray-600">Photos Delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
}