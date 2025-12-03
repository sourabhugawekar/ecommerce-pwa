import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const NapModeToggle = () => {
  const [napMode, setNapMode] = useState(false);

  useEffect(() => {
    // Load nap mode from localStorage
    const savedMode = localStorage.getItem('babybliss_nap_mode');
    if (savedMode === 'true') {
      setNapMode(true);
      document.documentElement.classList.add('nap-mode');
    }
  }, []);

  const toggleNapMode = (checked: boolean) => {
    setNapMode(checked);
    localStorage.setItem('babybliss_nap_mode', checked.toString());
    
    if (checked) {
      document.documentElement.classList.add('nap-mode');
    } else {
      document.documentElement.classList.remove('nap-mode');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {napMode ? (
        <Moon className="h-4 w-4 text-indigo-400" />
      ) : (
        <Sun className="h-4 w-4 text-yellow-500" />
      )}
      <Switch
        id="nap-mode"
        checked={napMode}
        onCheckedChange={toggleNapMode}
      />
      <Label htmlFor="nap-mode" className="text-sm cursor-pointer hidden sm:inline">
        Nap Mode
      </Label>
    </div>
  );
};
