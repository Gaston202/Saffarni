import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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

  const handleBudgetChange = (index, value) => {
    const newBudget = [...localPreferences.budget];
    newBudget[index] = parseInt(value);
    if (index === 0 && newBudget[0] > newBudget[1]) {
      newBudget[1] = newBudget[0];
    }
    if (index === 1 && newBudget[1] < newBudget[0]) {
      newBudget[0] = newBudget[1];
    }
    setLocalPreferences({
      ...localPreferences,
      budget: newBudget
    });
  };

  const handleApplyPreferences = () => {
    setPreferences(localPreferences);
  };

  return (
    <Card className="sticky top-8 h-fit">
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <span>📅</span>
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
            <span>💰</span>
            <span>Budget Range</span>
          </Label>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{localPreferences.budget[0]} TND</span>
              <span>to</span>
              <span>{localPreferences.budget[1]} TND</span>
            </div>
            <div className="relative h-6">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={localPreferences.budget[0]}
                onChange={(e) => handleBudgetChange(0, e.target.value)}
                className="absolute w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(localPreferences.budget[0] / 5000) * 100}%, hsl(var(--secondary)) ${(localPreferences.budget[0] / 5000) * 100}%, hsl(var(--secondary)) 100%)`
                }}
              />
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={localPreferences.budget[1]}
                onChange={(e) => handleBudgetChange(1, e.target.value)}
                className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <span>🏠</span>
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
                  localPreferences.travelStyles.includes(style) && "bg-orange-500 hover:bg-orange-600"
                )}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <span>📍</span>
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
                  localPreferences.selectedPreferences.includes(pref) && "bg-orange-500 hover:bg-orange-600"
                )}
              >
                {pref}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-teal-500 hover:bg-teal-600" 
          onClick={handleApplyPreferences}
        >
          Adjust Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesSidebar;

