
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Users, 
  UserPlus, 
  MessageSquare,
  Settings,
  Crown,
  Eye,
  Edit,
  Trash2,
  Send,
  Plus,
  Shield,
  Mail
} from "lucide-react";

const CollaborationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'members' | 'comments'>('members');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [newComment, setNewComment] = useState('');
  const [selectedPlot, setSelectedPlot] = useState('all');

  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'admin',
      avatar: '',
      joinedAt: '2024-01-01',
      lastActive: '2 hours ago',
      isOwner: true
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'editor',
      avatar: '',
      joinedAt: '2024-01-10',
      lastActive: '1 day ago',
      isOwner: false
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'viewer',
      avatar: '',
      joinedAt: '2024-01-15',
      lastActive: '3 days ago',
      isOwner: false
    }
  ];

  const comments = [
    {
      id: '1',
      author: 'Mike Chen',
      message: 'The tomato garden moisture levels seem consistently high. Should we adjust the watering schedule?',
      plotId: '1',
      plotName: 'Tomato Garden',
      timestamp: '2 hours ago',
      replies: [
        {
          id: '1-1',
          author: 'Sarah Johnson',
          message: 'Good observation! I\'ll reduce the duration by 10% and monitor for a few days.',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: '2',
      author: 'Emily Davis',
      message: 'Rain is expected this weekend. The system should automatically skip watering, right?',
      plotId: 'all',
      plotName: 'All Plots',
      timestamp: '1 day ago',
      replies: []
    },
    {
      id: '3',
      author: 'Sarah Johnson',
      message: 'Added new herbs to the corner plot. Updated the crop type and planting date.',
      plotId: '2',
      plotName: 'Herb Corner',
      timestamp: '2 days ago',
      replies: []
    }
  ];

  const plots = [
    { id: 'all', name: 'All Plots' },
    { id: '1', name: 'Tomato Garden' },
    { id: '2', name: 'Herb Corner' },
    { id: '3', name: 'Pepper Patch' }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'editor': return Edit;
      case 'viewer': return Eye;
      default: return Shield;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'editor': return 'bg-blue-100 text-blue-700';
      case 'viewer': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleInviteMember = () => {
    if (!newMemberEmail) return;
    
    console.log('Inviting member:', { email: newMemberEmail, role: newMemberRole });
    
    // In production, this would send an invitation
    setNewMemberEmail('');
    setNewMemberRole('viewer');
    
    // Show success message
    alert('Invitation sent successfully!');
  };

  const handleRemoveMember = (memberId: string) => {
    console.log('Removing member:', memberId);
    // In production, this would remove the member
    alert('Member removed successfully!');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    console.log('Adding comment:', { 
      message: newComment, 
      plotId: selectedPlot,
      author: 'Sarah Johnson' // Current user
    });
    
    setNewComment('');
    
    // In production, this would add the comment to the database
    alert('Comment added successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">Team Collaboration</h1>
              <p className="text-sm text-gray-500">Manage team & discussions</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/app')}
              className="p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-1 bg-white/50 rounded-lg p-1">
            <Button
              variant={activeTab === 'members' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('members')}
              className="px-4"
            >
              <Users className="w-4 h-4 mr-2" />
              Team Members
            </Button>
            <Button
              variant={activeTab === 'comments' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('comments')}
              className="px-4"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Comments
            </Button>
          </div>
        </div>

        {/* Team Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Invite New Member */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <UserPlus className="w-5 h-5 mr-2 text-green-600" />
                  Invite Team Member
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@example.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={newMemberRole} onValueChange={(value) => setNewMemberRole(value as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={handleInviteMember}
                  disabled={!newMemberEmail}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>

            {/* Current Team Members */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Team Members
                  </div>
                  <Badge variant="outline">{teamMembers.length} members</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            {member.isOwner && (
                              <Badge className="text-xs bg-gold-100 text-gold-700">Owner</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined {new Date(member.joinedAt).toLocaleDateString()} • 
                            Last active {member.lastActive}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                          <RoleIcon className="w-3 h-3 mr-1" />
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </Badge>
                        {!member.isOwner && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Role Permissions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Role Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div></div>
                    <div className="text-center font-medium">Viewer</div>
                    <div className="text-center font-medium">Editor</div>
                    <div className="text-center font-medium">Admin</div>
                  </div>
                  {[
                    'View plots & data',
                    'Add comments',
                    'Edit plot settings',
                    'Create new plots',
                    'Manage watering',
                    'Invite members',
                    'Remove members'
                  ].map((permission, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b border-gray-100 text-sm">
                      <div className="font-medium text-gray-700">{permission}</div>
                      <div className="text-center">
                        {index < 2 ? '✅' : '❌'}
                      </div>
                      <div className="text-center">
                        {index < 5 ? '✅' : '❌'}
                      </div>
                      <div className="text-center">✅</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-6">
            {/* Add New Comment */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-green-600" />
                  Add Comment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Plot</Label>
                  <Select value={selectedPlot} onValueChange={setSelectedPlot}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {plots.map((plot) => (
                        <SelectItem key={plot.id} value={plot.id}>
                          {plot.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Message</Label>
                  <Textarea
                    id="comment"
                    placeholder="Share your thoughts, observations, or questions..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </CardContent>
            </Card>

            {/* Comments Feed */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <Badge variant="outline" className="text-xs">
                            {comment.plotName}
                          </Badge>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.message}</p>
                        
                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                    {reply.author.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-sm text-gray-900">{reply.author}</h5>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-700">{reply.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-700">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom safe area */}
      <div className="h-20"></div>
    </div>
  );
};

export default CollaborationScreen;
