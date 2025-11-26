import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Calendar, Wallet, Home, MapPin } from 'lucide-react';

const PreferencesSidebar = ({ preferences, setPreferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const preferenceOptions = ['Sea', 'Mountains', 'Shopping', 'Monuments', 'Historical', 'Adventure'];
  const travelStyleOptions = ['Adventure', 'Culture', 'Relax', 'Luxury', 'Nature'];

  const handlePreferenceToggle = (pref) => {
    const newPrefs = localPreferences.selectedPreferences.includes(pref)
      ? localPreferences.selectedPreferences.filter(p => p !== pref)
      : [...localPreferences.selectedPreferences, pref];
    
    setLocalPreferences({
      ...localPreferences,
      selectedPreferences: newPrefs
    });
  };

  const handleTravelStyleToggle = (style) => {
    const newStyles = localPreferences.travelStyles.includes(style)
      ? localPreferences.travelStyles.filter(s => s !== style)
      : [...localPreferences.travelStyles, style];
    
    setLocalPreferences({
      ...localPreferences,
      travelStyles: newStyles
    });
  };

  const handleDurationChange = (index, value) => {
    const newDuration = [...localPreferences.duration];
    newDuration[index] = parseInt(value);
    if (index === 0 && newDuration[0] > newDuration[1]) {
      newDuration[1] = newDuration[0];
    }
    if (index === 1 && newDuration[1] < newDuration[0]) {
      newDuration[0] = newDuration[1];
    }
    setLocalPreferences({
      ...localPreferences,
      duration: newDuration
    });
  };

  const handleBudgetChange = (values) => {
    setLocalPreferences({
      ...localPreferences,
      budget: values
    });
  };

  const handleApplyPreferences = () => {
    setPreferences(localPreferences);
  };

  return (
    <Card className="sticky top-4 sm:top-8 h-fit">
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Duration (days)</span>
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max="30"
              value={localPreferences.duration[0]}
              onChange={(e) => handleDurationChange(0, e.target.value)}
              className="w-20"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="number"
              min="1"
              max="30"
              value={localPreferences.duration[1]}
              onChange={(e) => handleDurationChange(1, e.target.value)}
              className="w-20"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span>Budget Range</span>
          </Label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{localPreferences.budget[0]} TND</span>
              <span>to</span>
              <span>{localPreferences.budget[1]} TND</span>
            </div>
            <Slider
              value={localPreferences.budget}
              onValueChange={handleBudgetChange}
              min={0}
              max={5000}
              step={100}
              className="w-full [&_[role=slider]]:border-[#DF6951] [&>span>span]:bg-[#DF6951]"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Travel Style</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {travelStyleOptions.map(style => (
              <Button
                key={style}
                variant={localPreferences.travelStyles.includes(style) ? "default" : "outline"}
                size="sm"
                onClick={() => handleTravelStyleToggle(style)}
                className={cn(
                  "rounded-full",
                  localPreferences.travelStyles.includes(style) && "bg-[#DF6951] text-white hover:bg-[#c85a48]"
                )}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Preferences</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map(pref => (
              <Button
                key={pref}
                variant={localPreferences.selectedPreferences.includes(pref) ? "default" : "outline"}
                size="sm"
                onClick={() => handlePreferenceToggle(pref)}
                className={cn(
                  "rounded-full",
                  localPreferences.selectedPreferences.includes(pref) && "bg-[#DF6951] text-white hover:bg-[#c85a48]"
                )}
              >
                {pref}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-[#DF6951] text-white hover:bg-[#c85a48]" 
          onClick={handleApplyPreferences}
        >
          Adjust Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSidebar;

