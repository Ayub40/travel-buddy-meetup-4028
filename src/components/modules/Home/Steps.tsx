import { Users, MapPin, HeartHandshake, CalendarCheck, Compass, Route, Globe, Camera } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: Users,
    title: 'Find Travelers',
    description: 'Discover people who are going to the same destination as you.'
  },
  {
    icon: MapPin,
    title: 'View Profiles',
    description: 'Check traveler profiles, interests, plans, and travel styles.'
  },
  {
    icon: HeartHandshake,
    title: 'Match Preferences',
    description: 'Connect with travelers whose interests match yours.'
  },
  {
    icon: CalendarCheck,
    title: 'Plan Together',
    description: 'Schedule your trip and build your itinerary together.'
  },
  {
    icon: Compass,
    title: 'Explore Destinations',
    description: 'Visit new places, explore together, and enjoy your journey.'
  },
  {
    icon: Route,
    title: 'Create Trip Route',
    description: 'Build a complete travel route with your buddy.'
  },
  {
    icon: Globe,
    title: 'Travel Safely',
    description: 'Travel together with confidence and safety.'
  },
  {
    icon: Camera,
    title: 'Capture Memories',
    description: 'Take photos and create unforgettable trip moments.'
  },
];

const StepCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
  const bgColors = [
    'bg-blue-50',
    'bg-pink-50',
    'bg-green-50',
    'bg-yellow-50',
    'bg-purple-50',
    'bg-orange-50',
    'bg-teal-50',
    'bg-red-50',
  ];

  const iconColors = [
    'text-blue-600',
    'text-pink-600',
    'text-green-600',
    'text-yellow-600',
    'text-purple-600',
    'text-orange-600',
    'text-teal-600',
    'text-red-600',
  ];

  return (
    <Card className={`${bgColors[index % 8]} shadow-lg border-none rounded-xl`}>
      <CardContent className="p-5">
        <div className="flex items-start space-x-4">
          <div
            className={`p-3 rounded-full bg-white shadow-md ${iconColors[index % 8]}`}
          >
            <Icon size={25} />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Steps = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            How Travel Buddy Works
          </h2>
          <p className="text-muted-foreground mt-3">
            Follow a few simple steps and find the perfect travel partner for your next adventure.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
