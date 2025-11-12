import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

const DestinationCard = ({ destination, onSelect, isSelected, onCustomize }) => {
  const handleCardClick = (e) => {
    // Don't trigger selection if clicking on the customize button
    if (!e.target.closest('button')) {
      onSelect();
    }
  };

  const handleCustomizeClick = (e) => {
    e.stopPropagation();
    if (onCustomize) {
      onCustomize(destination.id);
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 w-full",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={handleCardClick}
    >
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-3 sm:p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{destination.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <span>📍</span>
          <span>{destination.location}</span>
        </div>
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ⭐ {destination.rating} ({destination.reviews})
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{destination.description}</p>
        <CardFooter className="flex justify-between items-center p-0 pt-3 border-t">
          <div className="text-sm font-medium text-foreground">
            {destination.price} {destination.currency} / person
          </div>
          <div className="text-sm text-muted-foreground">
            {destination.duration} days
          </div>
        </CardFooter>
        <Button 
          className="w-full mt-4 bg-teal-500 hover:bg-teal-600"
          onClick={handleCustomizeClick}
        >
          Customize Your Trip
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;

