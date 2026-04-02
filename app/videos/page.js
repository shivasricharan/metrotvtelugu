import FadeIn from "../../components/FadeIn";
import SectionTitle from "../../components/SectionTitle";
import VideoCard from "../../components/VideoCard";

const videos = [
  { title: "Breaking News Update", category: "News", videoId: "KlyvXNZWDZk" },
  { title: "Top Political Discussion", category: "Debate", videoId: "hdEp1t_PRbI" },
  { title: "Celebrity Segment", category: "Entertainment", videoId: "92DsruOUAD0" },
  { title: "Public Reaction Clip", category: "Voices", videoId: "ScMzIvxBSi4" },
  { title: "Special Focus Story", category: "Special Report", videoId: "1Ch2vJ1qmzM" },
  { title: "Weekend Roundup", category: "Highlights", videoId: "fXBpB0-NFk4" },
];

export default function VideosPage() {
  return (
    <section className="section-space">
      <div className="container">
        <FadeIn>
          <div className="glass-strong rounded-[30px] p-8 md:p-10">
            <SectionTitle
              eyebrow="Videos"
              title="Video-first browsing without backend complexity"
              desc="Just replace these placeholder IDs with real Metro TV Telugu YouTube IDs so the demo feels authentic."
            />
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videos.map((video, index) => (
            <FadeIn key={video.title} delay={index * 0.08}>
              <VideoCard {...video} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
