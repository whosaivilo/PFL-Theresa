import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  /** Deklrasai state **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8 md:p-16">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Modern <span className="text-pink-500">Frameworks</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Koleksi teknologi terbaik untuk membangun masa depan.
        </p>
      </div>
      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <select
        name="selectedTag"
        onChange={(e) => setSelectedTag(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white/70 backdrop-blur-md border border-pink-100 p-8 rounded-[2rem] 
                       shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(244,114,182,0.15)] 
                       transition-all duration-500 ease-out hover:-translate-y-4"
          >
            <div className="absolute top-0 right-0 -mr-2 -mt-2 w-20 h-20 bg-pink-100/50 rounded-full blur-2xl group-hover:bg-pink-200/50 transition-colors" />

            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
              {item.name}
            </h2>

            <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
              {item.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-400">
                <span className="bg-pink-50 text-pink-500 font-semibold px-2 py-0.5 rounded-md mr-2">
                  Dev
                </span>
                <span className="font-medium text-gray-700">
                  {item.details.developer}
                </span>
                <span className="mx-2">•</span>
                <span>{item.details.releaseYear}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white border border-pink-50 text-pink-400 px-3 py-1 text-[10px] 
                               uppercase tracking-wider font-bold rounded-full shadow-sm 
                               group-hover:border-pink-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <hr className="border-pink-50" />

              <a
                href={item.details.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-pink-500 font-semibold text-sm hover:text-pink-700 transition-all group/link"
              >
                Visit Website
                <svg
                  className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
