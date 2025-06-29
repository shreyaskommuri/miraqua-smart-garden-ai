
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Users, 
  Trophy, 
  Heart, 
  MessageSquare,
  Share,
  Target,
  Eye,
  ThumbsUp,
  Camera
} from 'lucide-react';

const CommunityScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [loading, setLoading] = useState(true);
  const [communityData, setCommunityData] = useState<any>(null);

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    setLoading(true);
    setTimeout(() => {
      setCommunityData({
        challenges: [
          {
            id: 1,
            title: 'Summer Water Saver',
            description: 'Reduce water usage by 20% this month',
            participants: 234,
            daysLeft: 12,
            reward: '50 points',
            progress: 65,
            joined: true
          },
          {
            id: 2,
            title: 'Green Thumb Challenge',
            description: 'Grow 3 different vegetables',
            participants: 189,
            daysLeft: 25,
            reward: 'Expert Badge',
            progress: 33,
            joined: false
          }
        ],
        feed: [
          {
            id: 1,
            user: { name: 'Sarah Chen', avatar: '/placeholder.svg' },
            content: 'Just harvested my first tomatoes of the season! 🍅',
            image: '/placeholder.svg',
            likes: 24,
            comments: 8,
            timeAgo: '2h ago'
          },
          {
            id: 2,
            user: { name: 'Mike Rodriguez', avatar: '/placeholder.svg' },
            content: 'My smart irrigation system saved 30% water this week!',
            likes: 15,
            comments: 5,
            timeAgo: '4h ago'
          }
        ],
        leaderboard: [
          { rank: 1, name: 'GreenThumb_Pro', points: 2340, badge: 'Expert' },
          { rank: 2, name: 'PlantWhisperer', points: 2180, badge: 'Master' },
          { rank: 3, name: 'EcoGardener', points: 1950, badge: 'Advanced' }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-bold">Community</h1>
            </div>
          </div>
        </header>
        <div className="p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-green-900">Community</h1>
              <p className="text-sm text-green-700">Connect with fellow gardeners</p>
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm -mx-4 px-4 py-2 border-b">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6 space-y-4">
              <TabsContent value="feed" className="space-y-4">
                {communityData.feed.map((post: any) => (
                  <Card key={post.id} className="border-green-200 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{post.user.name}</div>
                          <div className="text-sm text-gray-500">{post.timeAgo}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-600">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="challenges" className="space-y-4">
                {communityData.challenges.map((challenge: any) => (
                  <Card key={challenge.id} className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span>{challenge.title}</span>
                        </div>
                        <Badge className={challenge.joined ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {challenge.joined ? 'Joined' : 'Available'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{challenge.description}</p>
                      
                      {challenge.joined && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${challenge.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <div>{challenge.participants} participants</div>
                          <div>{challenge.daysLeft} days left</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-blue-600">{challenge.reward}</div>
                          <Button 
                            size="sm" 
                            className={challenge.joined ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'}
                            disabled={challenge.joined}
                          >
                            {challenge.joined ? 'Joined' : 'Join Challenge'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-4">
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span>Top Gardeners</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {communityData.leaderboard.map((user: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              user.rank === 1 ? 'bg-yellow-500' : 
                              user.rank === 2 ? 'bg-gray-400' : 
                              user.rank === 3 ? 'bg-orange-500' : 'bg-gray-300'
                            }`}>
                              {user.rank}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <Badge variant="outline" className="text-xs">
                                {user.badge}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">{user.points}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CommunityScreen;
