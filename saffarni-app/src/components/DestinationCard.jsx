import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, MapPin, Star } from 'lucide-react';

const DestinationCard = ({ destination, onSelect, isSelected, onCustomize }) => {
  const handleCardClick = (e) => {
    if (!e.target.closest('button')) onSelect();
  };

  const handleCustomizeClick = (e) => {
    e.stopPropagation();
    const destId = destination.id || destination._id;
    onCustomize?.(destId);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 w-full",
        isSelected && "ring-2 ring-[#DF6951]"
      )}
      onClick={handleCardClick}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
        />
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#DF6951] hover:text-white transition-colors duration-300"
          aria-label="Add to favorites"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* CONTENT */}
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {destination.title}
        </h3>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span>{destination.location}</span>
        </div>

        <div className="mb-3">
          <span 
            className="inline-flex items-center gap-1 text-white px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#DF6951" }}
          >
            <Star className="w-4 h-4 fill-white" />
            {destination.rating} ({destination.reviews})
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {destination.description}
        </p>

        <CardFooter className="flex justify-between items-center p-0 pt-3 border-t">
          <div className="text-sm font-medium text-foreground">
            {destination.price} {destination.currency} / person
          </div>
          <div className="text-sm text-muted-foreground">
            {destination.duration} days
          </div>
        </CardFooter>

        <Button
          className="w-full mt-4 bg-[#DF6951] text-white hover:bg-[#c85a48]"
          onClick={handleCustomizeClick}
        >
          Customize Your Trip
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
