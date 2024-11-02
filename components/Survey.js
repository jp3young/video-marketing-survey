import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Target, Printer, Play } from 'lucide-react';

const categories = {
  "Awareness": [
    "How would you rate the current level of awareness of your brand/business with your target market?",
    "Of those that are aware of your business, to what extent do you feel they understand the what and how of your business?",
    "How connected do you feel your brand's imagery (visuals, digital, print, clothing, signage, etc) is to your ideal target market and your product/service?"
  ],
  "Engagement": [
    "In your current marketing, how often do you aim to educate, inform or inspire your target market about your area of expertise or niche knowledge?",
    "Considering someone who is not a current or past customer. How would you rate their likely level of perceived trust in your brand/business to deliver what you promise?",
    "How likeable is your brand/business to your ideal customer?"
  ],
  "Conversion": [
    "Considering your current customers and others who interact with your brand online and off. How likely are they to take action from your current marketing by sharing it with others, responding to any call to action, or directly purchasing?",
    "How would you rate your target markets level of perceived need or desire for your product/service?",
    "How effective is your sales process to take interested inquiries through to customer or client?"
  ],
  "Loyalty": [
    "Rate your level of direct communication with current and past clients (how often do you maintain contact with them).",
    "How likely is it that your past clients purchase from you again, or become recurring clients?",
    "How likely are you to retain a client, even if a direct competitor lowers their prices to be slightly less than yours?"
  ],
  "Advocacy": [
    "Considering your current and recent past customers. How likely would they be to refer you to others?",
    "If you were to publish a video, image or post on your business social media page that promoted a 'special price' or 'offer' for your services, how would you rate the likelihood for this content to be shared, commented on or 'liked'?",
    "If you were to contact a past client directly via phone or email to seek their opinion on a new product or service, or to refer someone to your business. How keen would they be to help?"
  ]
};

const videoSuggestions = {
  "Awareness": {
    types: [
      "Brand Story Videos - Share your company's journey and values",
      "Educational Industry Overview Videos - Position yourself as an expert",
      "Behind-the-Scenes Content - Show your company culture and process"
    ],
    stats: [
      "93% of brands got a new customer because of a video on social media",
      "Viewers retain 95% of a message when they watch it in a video compared to 10% when reading it in text",
      "88% of people say they've been convinced to buy a product or service by watching a brand's video"
    ]
  },
  "Engagement": {
    types: [
      "Expert Interview Series - Showcase industry knowledge",
      "How-To Videos - Provide valuable insights to your audience",
      "Customer Success Stories - Build trust through social proof"
    ],
    stats: [
      "People spend 88% more time on websites with video content",
      "72% of customers prefer learning about a product or service through video",
      "Videos on social media generate 1200% more shares than text and images combined"
    ]
  },
  "Conversion": {
    types: [
      "Product Demo Videos - Showcase features and benefits",
      "FAQ Videos - Address common customer concerns",
      "Process Explanation Videos - Clear path to purchase"
    ],
    stats: [
      "84% of people say they've been convinced to buy a product by watching a brand's video",
      "Video on landing pages can increase conversion rates by up to 80%",
      "76% of marketers say video has helped them increase sales"
    ]
  },
  "Loyalty": {
    types: [
      "Customer Appreciation Videos - Show gratitude to existing clients",
      "Product Update Announcements - Keep clients informed",
      "Exclusive Behind-the-Scenes Content - Make customers feel special"
    ],
    stats: [
      "68% of consumers prefer watching videos to learn about new products or services",
      "Regular video content can increase customer retention rates by 85%",
      "Video marketers get 66% more qualified leads per year"
    ]
  },
  "Advocacy": {
    types: [
      "Customer Testimonial Videos - Showcase real experiences",
      "Community Impact Videos - Share your brand's values",
      "User-Generated Content Campaigns - Encourage customer participation"
    ],
    stats: [
      "87% of consumers say authentic customer content has influenced their purchase decision",
      "Branded video content is 85% more likely to be shared than text or static images",
      "92% of consumers trust peer recommendations over traditional advertising"
    ]
  }
};

const detailedLabels = [
  "exposure", "understanding", "connection",
  "value", "trust", "likeability",
  "motivation", "desire", "effectiveness",
  "communication", "repeat purchase", "retention",
  "referrers", "sales engagement", "utility"
];

const CustomSlider = ({ value, onChange }) => (
  <div className="relative py-4">
    <Slider
      value={[value]}
      min={0}
      max={10}
      step={1}
      onValueChange={onChange}
      className="relative h-2"
    />
  </div>
);

const RecommendationsSection = ({ scores }) => {
  const allSkills = [];
  Object.entries(categories).forEach(([category, skills], categoryIndex) => {
    skills.forEach((skill, skillIndex) => {
      const score = scores[categoryIndex * 3 + skillIndex];
      allSkills.push({ skill, score, category });
    });
  });

  const categoryScores = Object.entries(categories).map(([category, skills], categoryIndex) => {
    const categoryScores = skills.map((_, skillIndex) => 
      allSkills[categoryIndex * 3 + skillIndex].score
    );
    const average = categoryScores.reduce((a, b) => a + b, 0) / skills.length;
    return { category, score: average };
  });

  const lowestCategories = categoryScores
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return (
    <div className="mt-8 bg-blue-50 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Play className="text-blue-500" />
        <h3 className="text-lg font-semibold">Video Marketing Recommendations</h3>
      </div>
      
      <div className="space-y-8">
        <p className="text-gray-700">
          Forest City Creative, your strategic video production partner, can help strengthen these key areas through targeted video content:
        </p>
        
        {lowestCategories.map(({ category }, index) => (
          <div key={category} className="bg-white p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <h4 className="text-xl font-medium text-blue-900">
                {index + 1}. {category}
              </h4>
            </div>
            
            <div className="space-y-6">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Recommended Video Types:</h5>
                <ul className="space-y-2">
                  {videoSuggestions[category].types.map((type, idx) => (
                    <li key={idx} className="flex gap-2">
                      <Play className="text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-blue-800 mb-2">Supporting Statistics:</h5>
                <ul className="space-y-2">
                  {videoSuggestions[category].stats.map((stat, idx) => (
                    <li key={idx} className="flex gap-2">
                      <BookOpen className="text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-blue-100 p-4 rounded-lg mt-6">
          <p className="text-gray-800">
            Ready to elevate your video marketing strategy? Contact Forest City Creative to discuss how we can help you create impactful videos that drive results in these key areas.
          </p>
        </div>
      </div>
    </div>
  );
};

const SurveyRadar = () => {
  const [scores, setScores] = useState(
    Object.values(categories).flat().map(() => 5)
  );
  const [showResults, setShowResults] = useState(false);

  const handleSliderChange = (index, newValue) => {
    const newScores = [...scores];
    newScores[index] = newValue[0];
    setScores(newScores);
  };

  const getCategoryAverage = (categoryQuestions, startIdx) => {
    const categoryScores = categoryQuestions.map((_, i) => scores[startIdx + i]);
    return categoryScores.reduce((a, b) => a + b, 0) / categoryQuestions.length;
  };

  const detailedChartData = Object.values(categories).flat().map((question, index) => ({
    subject: detailedLabels[index],
    score: scores[index]
  }));

  const summaryChartData = Object.entries(categories).map(([category, questions], idx) => ({
    subject: category,
    score: getCategoryAverage(questions, idx * 3)
  }));

  const handlePrint = () => {
    window.print();
  };

  const allQuestions = Object.values(categories).flat();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-2">Video Marketing Analysis Survey</CardTitle>
          <p className="text-gray-600">
            Please fill out the survey below to get a comprehensive picture of where your business needs to focus it's video content creation efforts
          </p>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-8">
              {allQuestions.map((question, index) => (
                <div key={question} className="border-b border-gray-100 pb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <label className="font-medium text-gray-700 flex-1 mr-4">{question}</label>
                      <span className="text-blue-600 font-semibold text-lg min-w-[2rem] text-center">
                        {scores[index]}
                      </span>
                    </div>
                    <CustomSlider
                      value={scores[index]}
                      onChange={(value) => handleSliderChange(index, value)}
                    />
                  </div>
                </div>
              ))}
              <Button 
                onClick={() => setShowResults(true)}
                className="w-full mt-8 p-6 text-lg"
              >
                View Results
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="summary">Category Summary</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                </TabsList>
                <TabsContent value="summary">
                  <div className="flex justify-center pt-4">
                    <div className="max-w-full overflow-hidden">
                      <RadarChart 
                        width={400} 
                        height={400} 
                        data={summaryChartData}
                        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                      >
                        <PolarGrid />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                        />
                        <Radar
                          name="Category Scores"
                          dataKey="score"
                          stroke="#2563eb"
                          fill="#2563eb"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="detailed">
                  <div className="flex justify-center pt-4">
                    <div className="max-w-full overflow-hidden">
                      <RadarChart 
                        width={500} 
                        height={500} 
                        data={detailedChartData}
                        margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
                      >
                        <PolarGrid />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                        />
                        <Radar
                          name="Individual Scores"
                          dataKey="score"
                          stroke="#2563eb"
                          fill="#2563eb"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <RecommendationsSection scores={scores} />

              <div className="flex gap-4">
                <Button 
                  onClick={() => setShowResults(false)}
                  className="flex-1 p-6"
                >
                  Back to Survey
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="flex-1 p-6"
                >
                  <Printer className="mr-2" />
                  Print Results
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyRadar;
