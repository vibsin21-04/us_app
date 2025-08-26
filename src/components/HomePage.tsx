import React, { useState } from 'react';
import './HomePage.css';
import Post from './Post';

interface PostData {
  id: number;
  username: string;
  userAvatar: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timeAgo: string;
}

interface Comment {
  id: number;
  username: string;
  text: string;
}

type Mode = 'RELAX' | 'LEARN' | 'LAUGH';

const HomePage: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<Mode>('RELAX');

  const modes: Mode[] = ['RELAX', 'LEARN', 'LAUGH'];
  
  const cycleMode = () => {
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setCurrentMode(modes[nextIndex]);
  };

  // Sample post data for each mode
  const postsByMode: Record<Mode, PostData[]> = {
    RELAX: [
      {
        id: 1,
        username: "adventure_seeker",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        postImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop",
        caption: "Morning hike to the top! The view was worth every step 🥾⛰️ #hiking #adventure #nature",
        likes: 203,
        comments: [
          { id: 1, username: "mountain_climber", text: "Which trail is this?" },
          { id: 2, username: "outdoor_life", text: "Added to my bucket list!" },
          { id: 3, username: "fitness_guru", text: "Great workout! 💪" }
        ],
        timeAgo: "6 hours ago"
      },
      {
        id: 2,
        username: "zen_master",
        userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        postImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        caption: "Sometimes you need to sit quietly and just breathe. Find your inner peace 🧘‍♀️✨ #meditation #mindfulness #peace",
        likes: 156,
        comments: [
          { id: 1, username: "calm_soul", text: "So peaceful 🙏" },
          { id: 2, username: "mindful_mom", text: "Needed this reminder today" }
        ],
        timeAgo: "12 hours ago"
      }
    ],
    LEARN: [
      {
        id: 3,
        username: "science_explorer",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        postImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop",
        caption: "Did you know that one teaspoon of neutron star material would weigh about 6 billion tons? 🌟🔬 The universe is mind-blowing! #science #astronomy #facts",
        likes: 324,
        comments: [
          { id: 1, username: "physics_fan", text: "That's incredible! 🤯" },
          { id: 2, username: "space_nerd", text: "Love these space facts!" },
          { id: 3, username: "curious_mind", text: "How is that even possible?" }
        ],
        timeAgo: "3 hours ago"
      },
      {
        id: 4,
        username: "history_buff",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        postImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
        caption: "The Library of Alexandria wasn't destroyed in a single event - it declined over centuries due to budget cuts and changing priorities. History is more complex than we think! 📚🏛️ #history #education #facts",
        likes: 189,
        comments: [
          { id: 1, username: "book_lover", text: "Love learning new perspectives!" },
          { id: 2, username: "ancient_history", text: "Thanks for sharing this!" }
        ],
        timeAgo: "8 hours ago"
      }
    ],
    LAUGH: [
      {
        id: 5,
        username: "meme_lord",
        userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        postImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
        caption: "When you realize you've been pronouncing 'gif' wrong your whole life but you're too stubborn to change 😅🤷‍♂️ #relatable #memes #techhumor",
        likes: 567,
        comments: [
          { id: 1, username: "code_comedian", text: "It's gif not jif! 😂" },
          { id: 2, username: "tech_rebel", text: "I will never surrender!" },
          { id: 3, username: "grammar_police", text: "The creator said it's jif though..." }
        ],
        timeAgo: "2 hours ago"
      },
      {
        id: 6,
        username: "daily_dose_of_fun",
        userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        postImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
        caption: "Me: I'll just check social media for 5 minutes. Also me: *3 hours later still scrolling* 📱⏰ Anyone else? 😂 #socialmedialife #relatable #timeflies",
        likes: 892,
        comments: [
          { id: 1, username: "scroll_master", text: "Story of my life! 😅" },
          { id: 2, username: "procrastinator", text: "Currently me right now" },
          { id: 3, username: "time_thief", text: "Where did my day go?!" }
        ],
        timeAgo: "5 hours ago"
      }
    ]
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="app-title" onClick={cycleMode}>
          {currentMode}
        </h1>
      </header>
      
      <main className="feed">
        {postsByMode[currentMode].map(post => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
