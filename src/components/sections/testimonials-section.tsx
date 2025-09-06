'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael Johnson',
    role: 'Wedding Clients',
    content: 'Absolutely incredible experience! The photos captured every emotion and detail of our special day. The quality and creativity exceeded our expectations. We couldn\'t be happier with our wedding album.',
    rating: 5,
    image: 'https://placehold.co/100x100?text=S&M',
    alt: 'Sarah and Michael Johnson wedding clients profile photo'
  },
  {
    id: 2,
    name: 'David Thompson',
    role: 'Corporate Executive',
    content: 'Professional, efficient, and produced outstanding headshots for our entire executive team. The attention to detail and ability to make everyone comfortable during the shoot was remarkable.',
    rating: 5,
    image: 'https://placehold.co/100x100?text=DT',
    alt: 'David Thompson corporate executive profile photo'
  },
  {
    id: 3,
    name: 'The Martinez Family',
    role: 'Family Portrait Session',
    content: 'Working with this photographer was a joy from start to finish. They captured beautiful, natural moments of our family that we will treasure forever. Highly recommend for family photography!',
    rating: 5,
    image: 'https://placehold.co/100x100?text=MF',
    alt: 'Martinez family portrait session client photo'
  },
  {
    id: 4,
    name: 'Emily Chen',
    role: 'Portrait Session',
    content: 'The portrait session was amazing! I felt so comfortable throughout the shoot, and the final images were stunning. Perfect for my professional portfolio and personal collection.',
    rating: 5,
    image: 'https://placehold.co/100x100?text=EC',
    alt: 'Emily Chen portrait session client photo'
  },
  {
    id: 5,
    name: 'TechStart Inc.',
    role: 'Corporate Event',
    content: 'Exceptional event photography that captured the energy and professionalism of our product launch. The team was unobtrusive yet managed to document every important moment.',
    rating: 5,
    image: 'https://placehold.co/100x100?text=TS',
    alt: 'TechStart Inc corporate event client logo'
  },
  {
    id: 6,
    name: 'Jessica & Robert',
    role: 'Engagement Session',
    content: 'Our engagement photos are absolutely perfect! The photographer found the most beautiful locations and captured our love story in a way that felt natural and authentic.',
    rating: 5,
    image: 'https://placehold.co/100x100?text=J&R',
    alt: 'Jessica and Robert engagement session clients photo'
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say 
            about their photography experience with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                >
                  <Card className="mx-4 border-0 shadow-xl">
                    <CardContent className="p-12 text-center">
                      {/* Quote Icon */}
                      <div className="mb-8">
                        <svg
                          className="w-12 h-12 text-primary mx-auto opacity-50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                        </svg>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
                        "{testimonial.content}"
                      </p>

                      {/* Client Info */}
                      <div className="flex items-center justify-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => handleDotClick((currentIndex - 1 + testimonials.length) % testimonials.length)}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => handleDotClick((currentIndex + 1) % testimonials.length)}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted By</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-gray-500 font-semibold">500+ Happy Clients</div>
            <div className="text-gray-500 font-semibold">Award Winner</div>
            <div className="text-gray-500 font-semibold">5-Star Rated</div>
            <div className="text-gray-500 font-semibold">Professional Member</div>
          </div>
        </div>
      </div>
    </section>
  );
}