import ChatBox from "../components/ChatBox";
import ReelsFeed from "../components/ReelsFeed";
import StoryBar from "../components/StoryBar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <StoryBar />
      <div className="grid md:grid-cols-2 gap-4 p-4">
        <ChatBox />
        <ReelsFeed />
      </div>
    </div>
  );
}
