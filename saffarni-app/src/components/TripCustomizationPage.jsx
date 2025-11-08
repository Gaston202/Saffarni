import { useState } from 'react';
import { destinations } from '../data/destinations';
import { destinationDetails } from '../data/destinationDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ArrowLeft, X } from 'lucide-react';

const TripCustomizationPage = ({ destinationId, onBack }) => {
  const destination = destinations.find(d => d.id === destinationId);
  const details = destinationDetails[destinationId] || { restaurants: [], hotels: [], places: [] };

  const [selectedItems, setSelectedItems] = useState({
    restaurants: [],
    hotels: [],
    places: []
  });

  const toggleItem = (category, item) => {
    setSelectedItems(prev => {
      const categoryItems = prev[category];
      const isSelected = categoryItems.some(i => i.id === item.id);
      
      if (isSelected) {
        return {
          ...prev,
          [category]: categoryItems.filter(i => i.id !== item.id)
        };
      } else {
        return {
          ...prev,
          [category]: [...categoryItems, item]
        };
      }
    });
  };

  const isItemSelected = (category, itemId) => {
    return selectedItems[category].some(item => item.id === itemId);
  };

  const totalSelected = 
    selectedItems.restaurants.length + 
    selectedItems.hotels.length + 
    selectedItems.places.length;

  const renderItemCard = (item, category) => {
    const selected = isItemSelected(category, item.id);
    const icon = category === 'restaurants' ? '🍽️' : category === 'hotels' ? '🏨' : '📍';
    const showImage = item.image;
    
    return (
      <Card
        key={item.id}
        className={cn(
          "overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
          selected && "ring-2 ring-primary bg-teal-50"
        )}
        onClick={() => toggleItem(category, item)}
      >
        {showImage && (
          <div className="relative w-full h-44 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
              <Checkbox
                checked={selected}
                onCheckedChange={() => toggleItem(category, item)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
        {!showImage && (
          <div className="absolute top-2 right-2 z-10">
            <Checkbox
              checked={selected}
              onCheckedChange={() => toggleItem(category, item)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span>{icon}</span>
            <h4 className="text-lg font-semibold flex-1">{item.name}</h4>
            <span className="text-xs bg-muted px-2 py-1 rounded-full">{item.type}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500">⭐</span>
            <span className="text-sm">{item.rating}</span>
            {item.price && (
              <span className="ml-auto text-xs bg-orange-500 text-white px-2 py-1 rounded">
                {item.price}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
          <p className="text-xs text-muted-foreground">{item.address}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
          <h1 className="text-4xl font-semibold mb-2">Customize Your Trip</h1>
          <h2 className="text-2xl font-semibold text-orange-500 mb-2">{destination?.title}</h2>
          <p className="text-muted-foreground">📍 {destination?.location}</p>
        </div>

        <div className="grid grid-cols-[1fr_350px] gap-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>🍽️ Restaurants ({details.restaurants.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  {details.restaurants.map(item => renderItemCard(item, 'restaurants'))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🏨 Hotels ({details.hotels.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  {details.hotels.map(item => renderItemCard(item, 'hotels'))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📍 Places to Visit ({details.places.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                  {details.places.map(item => renderItemCard(item, 'places'))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="sticky top-8 h-fit">
            <CardHeader>
              <CardTitle>Your Trip Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-teal-500 text-white px-4 py-2 rounded-md text-center font-semibold">
                {totalSelected} {totalSelected === 1 ? 'item' : 'items'} selected
              </div>

              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {totalSelected === 0 ? (
                  <p className="text-center text-muted-foreground italic py-8">
                    No items selected yet. Start building your trip!
                  </p>
                ) : (
                  <>
                    {selectedItems.restaurants.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">🍽️ Restaurants</h4>
                        <ul className="space-y-2">
                          {selectedItems.restaurants.map(item => (
                            <li key={item.id} className="flex items-center justify-between bg-muted p-2 rounded">
                              <span className="text-sm">{item.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => toggleItem('restaurants', item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedItems.hotels.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">🏨 Hotels</h4>
                        <ul className="space-y-2">
                          {selectedItems.hotels.map(item => (
                            <li key={item.id} className="flex items-center justify-between bg-muted p-2 rounded">
                              <span className="text-sm">{item.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => toggleItem('hotels', item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedItems.places.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">📍 Places to Visit</h4>
                        <ul className="space-y-2">
                          {selectedItems.places.map(item => (
                            <li key={item.id} className="flex items-center justify-between bg-muted p-2 rounded">
                              <span className="text-sm">{item.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => toggleItem('places', item)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>

              {totalSelected > 0 && (
                <Button className="w-full bg-teal-500 hover:bg-teal-600">
                  Save Trip Plan
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripCustomizationPage;

