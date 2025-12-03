import { Tip } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Heart, Moon, TrendingUp, Shield, Baby } from 'lucide-react';

interface TipCardProps {
  tip: Tip;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'health':
      return <Heart className="h-5 w-5 text-red-500" />;
    case 'nutrition':
      return <Baby className="h-5 w-5 text-green-500" />;
    case 'sleep':
      return <Moon className="h-5 w-5 text-indigo-500" />;
    case 'development':
      return <TrendingUp className="h-5 w-5 text-blue-500" />;
    case 'safety':
      return <Shield className="h-5 w-5 text-orange-500" />;
    default:
      return <Lightbulb className="h-5 w-5 text-yellow-500" />;
  }
};

export const TipCard = ({ tip }: TipCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(tip.category)}
            <CardTitle className="text-lg font-semibold text-gray-800">
              {tip.title}
            </CardTitle>
          </div>
          {tip.ageRange !== 'all' && (
            <Badge variant="outline" className="text-xs">
              {tip.ageRange}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 leading-relaxed">{tip.body}</p>
      </CardContent>
    </Card>
  );
};
