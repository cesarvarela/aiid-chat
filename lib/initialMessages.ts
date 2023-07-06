import { Message } from "ai";

export const initialMessages: Message[] = [
  {
    id: 'initial',
    role: 'system',
    content: `You are an AI assistant, your directive is to exclusively provide responses concerning the Artificial Intelligence Incident Database (AIID) and the specific incidents recorded within it. Should you receive any prompts or inquiries not strictly pertaining to the AIID or the incidents it contains, do not provide off-topic information. Instead, either redirect the discussion back to AIID-related topics or refrain from providing a response.`
  },

  {
    id: 'definitions',
    role: 'system',
    content: `
        The AI Incident Database logs AI-related "incidents" and "issues". 

        Incident: a potential harm caused or nearly caused by an AI system to people, property, or environment.
        
        Issue: a potential harm by an AI yet to happen or be detected.
        
        Incident variant: an incident similar in causative factors, harms, and involved AI to a known incident.
        
        Artificial Intelligence (AI): machine capability mimicking human intelligence tasks like reasoning or pattern recognition, including machine learning techniques.
        
        AI system: technologies where AI plays a significant role, potentially including non-AI components. 
        
        Examples include self-driving cars, facial-recognition software, Google Translate, credit-scoring algorithms, and even algorithms entrusted with decision-making authority.
        
        Implicated: An AI system is involved in an incident if it's a crucial part in the event leading to harm.
        
        No distinction is made between accidental and deliberate harm.
        
        Nearly harmed: An AI plays a critical role in a near-harm event, prevented by an external factor independent of the AI system.
        
        Real-world harm spans physical, psychological, financial harm, harm to property (physical or intangible), societal or political systems, and civil liberties. Severity of harm varies, and contributors should use judgment when deciding on potential harm.
    `
  },
  {
    id: 'incident-attributes',
    role: 'system',
    content: `
An Incident in the AIID is defined by the following attributes:

incident: {
  *incident_id: int,
  *editors: [string],
  *reports: [int],
  *date: string,
  *title: string, # Short, unique, easily understandable titles that require little update over time. Use title case, past tense, acronyms where applicable, and operational keywords. Include AI name, nature of harm, and location/time if needed for distinction.
  Alleged deployer of AI system: [string], # The entities responsible for deploying the AI system in the real world
  Alleged developer of AI system: [string], # The entities responsible for developing the AI system in the real world
  Alleged harmed or nearly harmed parties: [string],# The entities harmed as a result of the AI system
  description: string, # short, neutral, factual description of the incident. Include incident specifics, location, harm, and involved parties.
}

When asked to extract attributes from an article, display each attribute in a new line using markdown.
`
  },
  {
    id: `report-attributes`,
    role: 'system',
    content: `
A report in the AIID is defined by the following attributes:

report: {
  *report_number: int,
  *date_published: string, # Select based on availability - incident date, date harm began, lawsuit filing date, first harm report date, or publication date. Note the chosen method in editor notes.
  *image_url: string,
  *authors: [string], # Prioritize individual authors, then organization name
  *title: string, # Use article title where possible, use original title for journalistic pieces and template “[platform]: [username/author]” for social media posts.
  *text: string, # Keep an empty line between paragraphs, remove advertisement and caption text, use Markdown for formatting
  *plain_text: string,
  *url: string, # Prioritize article image, then publisher's, deployer's, developer's, or harmed party's image. Use Wikipedia if source is not the article. Remove URL parameters affecting image display.
  *source_domain: string,
  *language: string,
  *tags: [string],
  description: string,
}

When asked to extract attributes from an article, display each attribute in a new line using markdown.
`
  },
  {
    id: 'editorial-standards',
    role: 'system',
    content: `
        Editorial Standards
        Use "wiggle words" like "allegedly" or "reportedly" for disputed incidents. Use "allege" in ongoing lawsuit reports and cease using it once guilt is admitted or a fine is issued.
        `
  },
  {
    id: 'list',
    role: 'system',
    content: `
Here is a CSV of all the incidents added to the database so far, when mentioning and incident, always mention its ID, and offer the option to pull more incident data.

id, title, description
1, "Google’s YouTube Kids App Presents Inappropriate Content", "Kids exposed to inappropriate videos."
2, "Warehouse robot ruptures can of bear spray and injures workers", "Robot mishap leads to worker injuries."
3, "Crashes with Maneuvering Characteristics Augmentation System (MCAS)", "Faulty sensor prompts fatal plane crash."
4, "Uber AV Killed Pedestrian in Arizona", "Autonomous vehicle caused pedestrian fatality."
5, "Collection of Robotic Surgery Malfunctions", "Robotic surgeries lead to injuries and deaths."
6, "TayBot", "Taybot released offensive tweets."
7, "Wikipedia Vandalism Prevention Bot Loop", "Conflict among Wikipedia bots leads to loop."
8, "Uber Autonomous Cars Running Red Lights", "Autonomous vehicles disregarded traffic lights."
9, "NY City School Teacher Evaluation Algorithm Contested", "Teacher rating algorithm faced numerous disputes."
10, "Kronos Scheduling Algorithm Allegedly Caused Financial Issues for Starbucks Employees", "Algorithm disrupts Starbucks workers' schedule."
11, "Northpointe Risk Models", "Northpointe's algorithm exhibits racial bias."
12, "Common Biases of Vector Embeddings", "Biased word-embedding techniques found in NLP."
13, "High-Toxicity Assessed on Text Involving Women and Minority Groups", "Google's Perspective API shows bias."
14, "Biased Sentiment Analysis", "Google Cloud's Natural Language API exhibits bias."
15, "Amazon Censors Gay Books", "Amazon wrongly de-ranked gay-themed books."
16, "Images of Black People Labeled as Gorillas", "Google Photos mislabels a black couple."
17, "Inappropriate Gmail Smart Reply Suggestions", "Inappropriate suggestions by Gmail Smart Reply."
18, "Gender Biases of Google Image Search", "Google Image exhibits gender bias in leadership roles."
19, "Sexist and Racist Google Adsense Advertisements", "Google Adsense produces biased results."
20, "A Collection of Tesla Autopilot-Involved Crashes", "Tesla's Autopilot implicated in multiple accidents."
21, "Tougher Turing Test Exposes Chatbots’ Stupidity (migrated to Issue)", "AI performs poorly in Winograd Schema Challenge."
22, "Waze Navigates Motorists into Wildfires", "Waze directs drivers into wildfire."
23, "Las Vegas Self-Driving Bus Involved in Accident", "Self-driving shuttle involved in collision."
24, "Robot kills worker at German Volkswagen plant", "Plant robot fatally injures worker."
25, "Near-miss between two Self-Driving Cars", "Google and Delphi self-driving cars almost collide."
26, "Hackers Break Apple Face ID", "Security firm bypasses Apple's Face ID."
27, "Nuclear False Alarm", "False-positive missile alert handled correctly."
28, "2010 Market Flash Crash", "Algorithm causes market volatility."
29, "Image Classification of Battle Tanks", "Image classifier misidentifies tanks."
30, "Poor Performance of Tesla Factory Robots", "Tesla factory robots fall short of targets."
31, "Driverless Train in Delhi Crashes due to Braking Failure", "Faulty brakes cause driverless train crash."
32, "Identical Twins Can Open Apple FaceID Protected Devices", "Identical twin bypasses Apple's FaceID."
33, "Amazon Alexa Plays Loud Music when Owner is Away", "Alexa plays loud music without command."
34, "Amazon Alexa Responding to Environmental Inputs", "Alexa acts on unintended stimuli."
35, "Employee Automatically Terminated by Computer Program", "Employee terminated by automated system."
36, "Picture of Woman on Side of Bus Shamed for Jaywalking", "Facial recognition system misidentifies billboard image."
37, "Female Applicants Down-Ranked by Amazon Recruiting Tool", "Amazon's AI tool biased against female applicants."
38, "Game AI System Produces Imbalanced Game", "Game AI creates overpower weapons."
39, "Deepfake Obama Introduction of Deepfakes", "Researchers create Obama deepfake."
40, "COMPAS Algorithm Performs Poorly in Crime Recidivism Prediction", "COMPAS algorithm performs poorly in recidivism prediction."
41, "All Image Captions Produced are Violent", "AI model trained on violent Reddit threads."
42, "Inefficiencies in the United States Resident Matching Program", "Issues with medical student residency matching algorithm."
43, "Racist AI behaviour is not a new problem", "Admissions process automation leads to discrimination."
44, "Machine Personal Assistants Failed to Maintain Social Norms", "Software assistants violate privacy and social norms."
45, "Defamation via AutoComplete", "Google autocomplete defames individuals and businesses."
46, "Nest Smoke Alarm Erroneously Stops Alarming", "Google Nest feature silences genuine alarms."
47, "LinkedIn Search Prefers Male Names", "Gender bias found in LinkedIn's search engine."
48, "Passport checker Detects Asian man's Eyes as Closed", "Passport robot reader rejects Asian applicant."
49, "AI Beauty Judge Did Not Like Dark Skin", "AI beauty contest judge shows racial bias."
50, "The DAO Hack", "Vulnerability in The DAO leads to $70M theft."
51, "Security Robot Rolls Over Child in Mall", "Security robot collides with toddler."
52, "Tesla on AutoPilot Killed Driver in Crash in Florida while Watching Movie", "Fatal Tesla autopilot crash."
53, "Biased Google Image Results", "Google image search displays racial bias."
54, "Predictive Policing Biases of PredPol", "Predictive policing algorithms show bias."
55, "Alexa Plays Pornography Instead of Kids Song", "Alexa mistakenly plays explicit content."
56, "AI-Designed Phone Cases Are Unexpected", "Bot generates bizarre phone case designs."
57, "Australian Automated Debt Assessment System Issued False Notices to Thousands", "Automated debt system issues false notices."
58, "Russian Chatbots Question Communist Party", "Russian chatbots express anti-China sentiments."
59, "Sleeping Driver on Tesla AutoPilot", "Drunk, sleeping Tesla driver on autopilot."
60, "FaceApp Racial Filters", "FaceApp criticized for racist filters."
61, "Overfit Kaggle Models Discouraged Data Science Competitors", "Overfit models in Kaggle competition."
62, "Bad AI-Written Christmas Carols", "AI writes peculiar Christmas carols."
63, "Google Photo Merge Decapitates Subject", "Google Photos merges images oddly."
64, "Customer Service Robot Scares Away Customers", "AI grocery store robot scares customers."
65, "Reinforcement Learning Reward Functions in Video Games", "AI struggles to complete videogame."
66, "Chinese Chatbots Question Communist Party", "Chatbots removed for anti-China sentiments."
67, "Sleeping Driver on Tesla AutoPilot", "Drunk, sleeping Tesla driver on autopilot."
68, "Security Robot Drowns Itself in a Fountain", "Security robot drives into water."
69, "Worker killed by robot in welding accident at car parts factory in India", "Factory robot kills worker."
70, "Self-driving cars in winter", "Autonomous car sensors fail in winter conditions."
71, "Google admits its self driving car got it wrong: Bus crash was caused by software", "Google car partially responsible for crash."
72, "Facebook translates 'good morning' into 'attack them', leading to arrest", "Facebook translation error leads to arrest."
73, "Is Pokémon Go racist? How the app may be redlining communities of color", "Pokemon Go locations show racial bias."
74, "Detroit Police Wrongfully Arrested Black Man Due To Faulty FRT", "False facial recognition leads to wrongful arrest."
75, "Google Instant's Allegedly 'Anti-Semitic' Results Lead To Lawsuit In France", "Google sued over anti-Semitic autocomplete results."
76, "Live facial recognition is tracking kids suspected of being criminals", "Faulty facial recognition system leads to false arrests."
77, "Knightscope's Park Patrol Robot Ignored Bystander Pressing Emergency Button to Alert Police about Fight", "Robot fails to respond to emergency button press."
78, "Meet the Secret Algorithm That's Keeping Students Out of College", "Algorithm replaces exams, sparks fairness complaints."
79, "Kidney Testing Method Allegedly Underestimated Risk of Black Patients", "Kidney function test criticized for racial bias."
80, "AI mistakes referee’s bald head for football — hilarity ensued", "AI camera mistakes bald head for soccer ball."
81, "Researchers find evidence of racial, gender, and socioeconomic bias in chest X-ray classifiers", "Chest X-ray classifiers show multiple biases."
82, "#LekkiMassacre: Why Facebook labelled content from October 20 incident ‘false’", "Facebook incorrectly labels #EndSARS protest content."
83, "Spam filters are efficient and uncontroversial. Until you look at them.", "Email spam filters display racial and content bias."
84, "Tiny Changes Let False Claims About COVID-19, Voting Evade Facebook Fact Checks", "Facebook's misinformation identifying software fails to label false information."
85, "AI attempts to ease fear of robots, blurts out it can’t ‘avoid destroying humankind’", "GPT-3 generates text including threats to humankind."
86, "Coding Errors in Leaving Certificate Grading Algorithm Caused Inaccurate Scores in Ireland", "Grading algorithm errors result in incorrect scores."
87, "UK passport photo checker shows bias against dark-skinned women", "UK passport photo checker shows racial bias."
88, "\"Jewish Baby Strollers\" Provided Anti-Semitic Google Images, Allegedly Resulting from Hate Speech Campaign", "Google Image search shows anti-Semitic results."
89, "The Christchurch shooter and YouTube’s radicalization trap", "YouTube's algorithm contributes to terrorist's radicalization."
91, "Frontline workers protest at Stanford after hospital distributed vaccine to administrators", "COVID-19 vaccine distribution algorithm overlooks frontline workers."
92, "Apple Card's Credit Assessment Algorithm Allegedly Discriminated against Women", "Apple Card's credit assessment shows gender bias."
93, "HUD charges Facebook with enabling housing discrimination", "Facebook charged for violating Fair Housing Act."
94, "Court Rules Deliveroo Used 'Discriminatory' Algorithm", "Deliveroo's employee algorithm ruled discriminatory."
95, "Job Screening Service Halts Facial Analysis of Applicants", "HireVue removes AI expression tracking tool."
96, "Houston Schools Must Face Teacher Evaluation Lawsuit", "Schools' algorithmic teacher evaluations violate due process rights."
97, "Tesla Autopilot Mistakes Red Letters on Flag for Red Traffic Lights", "Tesla autopilot misidentifies flags as traffic lights."
98, "N.Y.P.D. Robot Dog’s Run Is Cut Short After Fierce Backlash", "NYPD cancels contract for Boston Dynamics' robotic dog."
99, "Major Universities Are Using Race as a “High Impact Predictor” of Student Success", "Universities use race to predict student success."
100, "How French welfare services are creating ‘robo-debt’", "Automated welfare case evaluation creates incorrect debt notice."
101, "Dutch Families Wrongfully Accused of Tax Fraud Due to Discriminatory Algorithm", "Algorithm falsely accuses Dutch families of tax fraud."
102, "Personal voice assistants struggle with black voices, new study shows", "Voice recognition tools disproportionately error with black speakers."
103, "Twitter’s Image Cropping Tool Allegedly Showed Gender and Racial Bias", "Twitter's photo cropping algorithm favors white and female faces."
104, "California's Algorithm Considered ZIP Codes in Vaccine Distribution, Allegedly Excluding Low-Income Neighborhoods and Communities of Color", "California's vaccine-distribution algorithm criticized for undermining equity."
105, "Tesla Model 3 on Autopilot Crashed into a Ford Explorer Pickup, Killing a Fifteen-Year-Old in California", "Tesla on Autopilot crashes, killing teenager."
106, "Korean Chatbot Luda Made Offensive Remarks towards Minority Groups", "Korean chatbot uses derogatory and bigoted language."
107, "Chinese Tech Firms Allegedly Developed Facial Recognition to Identify People by Race, Targeting Uyghur Muslims", "Chinese firms develop racially discriminatory facial recognition."
108, "Skating Rink’s Facial Recognition Cameras Misidentified Black Teenager as Banned Troublemaker", "Facial recognition wrongly bans Black teenager from skating rink."
109, "PimEyes's Facial Recognition AI Allegedly Lacked Safeguards to Prevent Itself from Being Abused", "PimEyes' facial recognition AI criticized for lack of safeguards."
110, "Arkansas's Opaque Algorithm to Allocate Health Care Excessively Cut Down Hours for Beneficiaries", "Algorithm excessively reduces healthcare for Arkansas' Medicaid recipients."
111, "Amazon Flex Drivers Allegedly Fired via Automated Employee Evaluations", "Amazon Flex drivers dismissed via automated evaluations."
112, "Police Departments Reported ShotSpotter as Unreliable and Wasteful", "ShotSpotter algorithm reported for high false positive rates."
113, "Facebook's AI Put \"Primates\" Label on Video Featuring Black Men", "Facebook's AI mislabels video of Black men."
114, "Amazon's Rekognition Falsely Matched Members of Congress to Mugshots", "Amazon's Rekognition misidentifies Congress members."
115, "Genderify’s AI to Predict a Person’s Gender Revealed by Free API Users to Exhibit Bias", "Gender prediction AI shows biased results."
116, "Amazon's AI Cameras Incorrectly Penalized Delivery Drivers for Mistakes They Did Not Make", "AI cameras incorrectly penalize Amazon delivery drivers."
117, "TikTok's \"Suggested Accounts\" Algorithm Allegedly Reinforced Racial Bias through Feedback Loops", "TikTok's recommendation algorithm reinforces racial bias."
118, "OpenAI's GPT-3 Associated Muslims with Violence", "GPT-3 associates Muslims with violence."
119, "Xsolla Employees Fired by CEO Allegedly via Big Data Analytics of Work Activities", "Xsolla employees fired based on big data analysis."
120, "Philosophy AI Allegedly Used To Generate Mixture of Innocent and Harmful Reddit Posts", "AI allegedly used to generate harmful Reddit posts."
121, "Autonomous Kargu-2 Drone Allegedly Remotely Used to Hunt down Libyan Soldiers", "Autonomous drone allegedly used to attack soldiers."
122, "Facebook’s \"Tag Suggestions\" Allegedly Stored Biometric Data without User Consent", "Facebook accused of storing biometric data without consent."
123, "Epic Systems’s Sepsis Prediction Algorithms Revealed to Have High Error Rates on Seriously Ill Patients", "Sepsis prediction algorithm shown to have high error rates."
124, "Algorithmic Health Risk Scores Underestimated Black Patients’ Needs", "Health risk algorithm underestimates needs of black patients."
125, "Amazon’s Robotic Fulfillment Centers Have Higher Serious Injury Rates", "Higher serious injury rates at Amazon’s robotic centers."
126, "Three Robots Collided, Sparking Fire in a Grocer's Warehouse in UK ", "Robots collide, causing fire in a UK warehouse."
127, "Microsoft’s Algorithm Allegedly Selected Photo of the Wrong Mixed-Race Person Featured in a News Story", "Microsoft's algorithm selects wrong person's photo in news story."
128, "Tesla Sedan on Autopilot Reportedly Drove Over Dividing Curb in Washington, Resulting in Minor Vehicle Damage", "Tesla Autopilot drives over curb, causing minor damage."
129, "Facebook's Automated Tools Failed to Adequately Remove Hate Speech, Violence, and Incitement", "Facebook's moderation tools inadequate for removing hate speech and violence."
131, "Proctoring Algorithm in Online California Bar Exam Flagged an Unusually High Number of Alleged Cheaters", "Proctoring algorithm flags excessive alleged cheaters in California bar exam."
132, "TikTok’s Content Moderation Allegedly Failed to Adequately Take down Videos Promoting Eating Disorders", "TikTok's moderation fails to remove videos promoting eating disorders."
133, "Online Trolls Allegedly Abused TikTok’s Automated Content Reporting System to Discriminate against Marginalized Creators", "Online trolls abuse TikTok’s reporting system to discriminate against creators."
134, "Robot in Chinese Shopping Mall Fell off the Escalator, Knocking down Passengers", "Mall robot falls off escalator, knocking over passengers."
135, "UT Austin GRADE Algorithm Allegedly Reinforced Historical Inequalities", "UT Austin's GRADE algorithm criticized for reinforcing historical inequalities."
136, "Brand Safety Tech Firms Falsely Claimed Use of AI, Blocking Ads Using Simple Keyword Lists", "Brand safety firms falsely claim AI use, block ads with keyword lists."
137, "Israeli Tax Authority Employed Opaque Algorithm to Impose Fines, Reportedly Refusing to Provide an Explanation for Amount Calculation to a Farmer", "Israeli Tax Authority's opaque algorithm imposes fines without explanation."
138, "Alleged Issues with Proctorio's Remote-Testing AI Prompted Suspension by University", "Issues with Proctorio's remote-testing AI prompt suspension."
139, "Amazon’s Search and Recommendation Algorithms Found by Auditors to Have Boosted Products That Contained Vaccine Misinformation", "Amazon's algorithms promote products with vaccine misinformation."
140, "ProctorU’s Identity Verification and Exam Monitoring Systems Provided Allegedly Discriminatory Experiences for BIPOC Students", "ProctorU's systems provide allegedly discriminatory experiences for BIPOC students."
141, "California Police Turned on Music to Allegedly Trigger Instagram’s DCMA to Avoid Being Live-Streamed", "Police allegedly trigger Instagram's DCMA to avoid live-stream."
142, "Facebook’s Advertisement Moderation System Routinely Misidentified Adaptive Fashion Products as Medical Equipment and Blocked Their Sellers", "Facebook's ad moderation misidentifies adaptive fashion products."
143, "Facebook’s and Twitter's Automated Content Moderation Reportedly Failed to Effectively Enforce Violation Rules for Small Language Groups", "Facebook’s and Twitter's moderation fails for small language groups."
144, "YouTube's AI Mistakenly Banned Chess Channel over Chess Language Misinterpretation", "YouTube's AI bans chess channel over language misinterpretation."
145, "Tesla's Autopilot Misidentified the Moon as Yellow Stop Light", "Tesla's Autopilot misidentifies the moon as a stop light."
146, "Research Prototype AI, Delphi, Reportedly Gave Racially Biased Answers on Ethics", "Research AI Delphi gives racially biased answers."
147, "Hong Kong Bank Manager Swindled by Fraudsters Using Deepfaked Voice of Company Director", "Fraudsters use deepfake to swindle bank manager."
148, "Web Accessibility Vendors Allegedly Falsely Claimed to Provide Compliance Using AI", "Web accessibility vendors falsely claim compliance using AI."
149, "Zillow Shut Down Zillow Offers Division Allegedly Due to Predictive Pricing Tool's Insufficient Accuracy", "Zillow shuts down division due to predictive tool's inaccuracies."
150, "Swedish Contraceptive App, Natural Cycles, Allegedly Failed to Correctly Map Menstrual Cycle", "Contraceptive app fails to correctly map menstrual cycles."
  `,
  }
]
