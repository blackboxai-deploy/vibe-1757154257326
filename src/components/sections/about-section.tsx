import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About the Artist
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  With over 5 years of professional photography experience, I have dedicated 
                  my career to capturing life's most precious moments with artistic vision 
                  and technical excellence.
                </p>
                
                <p>
                  My passion for photography began during college when I discovered the power 
                  of storytelling through images. Since then, I've had the privilege of 
                  documenting hundreds of weddings, family milestones, and corporate events 
                  across the region.
                </p>
                
                <p>
                  Every session is approached with creativity, professionalism, and a deep 
                  commitment to understanding your unique vision. I believe that the best 
                  photographs happen when clients feel comfortable and authentic in front 
                  of the camera.
                </p>
              </div>

              {/* Skills/Specialties */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700">Wedding Photography</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700">Portrait Sessions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700">Family Photography</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700">Event Coverage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700">Corporate Events</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700">Digital Albums</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    Learn More About Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://placehold.co/600x700?text=Professional+Photographer+Portrait+Studio+Creative+Artist+Behind+Camera"
                  alt="Professional photographer portrait in studio showing creative artist working behind camera"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.backgroundColor = '#f3f4f6';
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                  }}
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-full"></div>

              {/* Experience Badge */}
              <div className="absolute top-8 -left-8 bg-white p-6 rounded-xl shadow-lg transform rotate-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              {/* Awards Badge */}
              <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg transform -rotate-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">12+</div>
                  <div className="text-sm text-gray-600">Awards Won</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My Approach</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every photograph should tell a story and evoke emotion. Here's what guides my work:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Passion</h4>
              <p className="text-gray-600">
                Every shoot is driven by genuine passion for capturing authentic moments and emotions
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Creativity</h4>
              <p className="text-gray-600">
                Innovative techniques and artistic vision to create unique, memorable images
              </p>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h4>
              <p className="text-gray-600">
                Commitment to the highest quality in every aspect, from shooting to final delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}