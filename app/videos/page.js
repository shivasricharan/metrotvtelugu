import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import VideoCard from "../../components/VideoCard";

const videos = [
  {
    title: "Breaking Bulletin: Top updates of the day",
    category: "News",
    videoId: "KlyvXNZWDZk",
  },
  {
    title: "Prime Time Discussion: The big political talking points",
    category: "Debate",
    videoId: "hdEp1t_PRbI",
  },
  {
    title: "Cinema Spotlight: Stories from the Telugu entertainment world",
    category: "Entertainment",
    videoId: "92DsruOUAD0",
  },
  {
    title: "On Ground Reactions: What people are saying",
    category: "Public Voice",
    videoId: "ma0ZPMJg5B4",
  },
  {
    title: "Issue Focus: A deeper look at the story behind the headlines",
    category: "Special Report",
    videoId: "fXBpB0-NFk4",
  },
  {
    title: "Top moments, big stories and standout segments of the week",
    category: "Weekend Highlights",
    videoId: "XdwVUXcL_Fs",
  },
];

export default function VideosPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-3xl p-8 md:p-10">
            <SectionTitle
              eyebrow="Videos"
              title="Watch Metro TV Telugu videos"
              desc="Explore featured bulletins, discussion segments, interviews and special stories from Metro TV Telugu in a cleaner, video-first experience."
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videos.map((video, index) => (
            <FadeIn key={video.title} delay={index * 0.08}>
              <VideoCard
                title={video.title}
                category={video.category}
                videoId={video.videoId}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}