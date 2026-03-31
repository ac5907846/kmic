import { useState, useEffect } from "react";

// ── TRANSLATIONS ──
const T = {
  en: {
    // Header
    badge: "KMIC Assessment",
    headerTitle1: "Knowledge Management",
    headerTitle2: "Infrastructure",
    headerTitle3: "Capability",
    headerSub: (n) =>
      `How well does your organization create, share, and apply knowledge? Rate five key dimensions and benchmark against ${n} architecture, engineering, and construction (A/E/C) firms using the Fuzzy Synthetic Evaluation (FSE) based KMIC Index model.`,
    whatIsTitle: "What is the KMIC Index?",
    whatIsBody:
      "It measures how ready your organization's foundation is to support knowledge management, covering five areas: trust and collaboration among employees, organizational culture and values, information systems, written policies, and employee empowerment. A higher score (closer to 5) means stronger foundational capability for creating, sharing, and applying knowledge effectively.",

    // Stepper & navigation
    back: "\u2190 Back",
    nextPrefix: "Next:",
    calculate: "\u2733 Calculate KMIC Index",
    startOver: "\u21BA Start Over",

    // Component card
    rateInstruction: "Rate each factor from 1 (Very Low) to 5 (Very High)",
    veryLow: "Very Low",
    veryHigh: "Very High",

    // Results - hero
    yourOrgIndex: "Your Organization's KMIC Index",
    scoreLabel: (score) => `Score: ${score} on a 1 to 5 scale`,
    percentile: "percentile",
    percentileDesc: (p, n) =>
      `Your score is higher than ${p}% of the ${n} surveyed A/E/C firms`,

    // Results - bar
    surveyAvg: (v) => `Survey avg: ${v}`,
    veryLowScale: "1.0 Very Low",
    moderateScale: "3.0 Moderate",
    veryHighScale: "5.0 Very High",

    // Histogram
    whereYouStand: "Where You Stand",
    whereYouStandDesc: (n) =>
      `Distribution of KMIC Index scores across ${n} surveyed organizations`,

    // Component breakdown
    componentBreakdown: "Component Breakdown",
    componentBreakdownDesc:
      "How your organization compares across five KMIC dimensions",
    fseTitle: "Powered by Fuzzy Synthetic Evaluation (FSE)",
    fseDesc: (n) =>
      `Unlike simple averaging, this analysis uses the FSE method to capture the full picture of how ${n} surveyed firms actually responded. Instead of reducing everything to a single number, the colored bar below shows the distribution of responses across five levels (Very Low to Very High), so you can see where most firms cluster and how spread out the opinions are. Your firm's category is highlighted in full color. The scale bar underneath shows your exact score (gold dot) compared to the survey average (gray line) on a 1 to 5 scale.`,
    distLabels: ["Very Low", "Low", "Medium", "High", "Very High"],
    yourFirmInCategory: (label, pct) =>
      `Your firm is in the <strong>${label}</strong> category (${pct}% of firms are also in this group)`,
    yourScore: "Your score:",
    benchmark: "Benchmark:",
    aboveTypical: (pct) => `${pct}% above typical`,
    belowTypical: (pct) => `${pct}% below typical`,

    // Segment comparison
    profileTitle: "KMIC Profile & Peer Comparison",
    profileDesc:
      "Your organization's profile compared against peer groups",
    allFirms: "All Firms",
    firmType: "Firm Type",
    firmSize: "Firm Size",
    selectGroupHint:
      "Select a group above, or viewing all firms by default",
    yourOrg: "Your organization",
    peerBenchmark: "Peer benchmark",
    higherThanPeers: "higher than peers",
    lowerThanPeers: "lower than peers",

    // Methodology
    methodTitle: "How This Was Calculated",
    methodDesc: "A brief overview of the methods behind your scores",
    methodFSETitle: "Fuzzy Synthetic Evaluation (FSE)",
    methodFSEBody: (n) =>
      `Your scores are computed using the FSE approach, a multi-criteria evaluation technique designed for situations where subjective assessments need to be aggregated into quantitative indexes. Rather than treating Likert-scale ratings as simple averages, FSE preserves the full distribution of responses through membership functions, which capture the proportion of respondents at each rating level. These membership functions are then combined using derived weightings to produce component-level and overall KMIC indexes.`,
    methodFormulaTitle: "KMIC Index Formula",
    methodFormulaBody: (n) =>
      `Your KMIC Index is calculated as KMIC = \u03A3(OW<sub>ij</sub> \u00D7 RS<sub>ij</sub>), where OW<sub>ij</sub> is the overall weight of each factor (derived from CFA factor loadings and FSE group weights) and RS<sub>ij</sub> is your rating score. This integrates both statistical importance and empirical weighting from ${n} survey respondents.`,
    methodClassTitle: "Classification: Confidence Criterion",
    methodClassBody:
      "Each score is classified into a level (Very Low through Very High) using the confidence criterion with lambda = 0.5. This method accumulates membership from the highest grade downward until the cumulative value reaches 50%. The grade where this threshold is crossed determines the classification. This is more robust than the simpler maximum membership principle because it avoids edge cases where the top grade barely leads. This approach follows established FSE literature (Xu et al., 2010; Osei-Kyei and Chan, 2017).",
    methodBenchTitle: "Benchmark Data",
    methodBenchBody: (n) =>
      `All benchmarks come from a survey of ${n} A/E/C practitioners in Vietnam, validated through confirmatory factor analysis (CFA) with strong construct reliability (CR > 0.7, AVE > 0.5 for most components). The Mann-Whitney U test confirmed that KMIC factors are consistent across firm types and sizes (p > 0.05), supporting the benchmark's broad applicability within the A/E/C sector.`,

    // Recommendations
    recTitle: "Recommendations",
    recAnalyzing: "Analyzing your profile...",
    recTryAgain: "\u21BB Try Again",
    recRegenerate: "\u21BB Regenerate",
    recDisclaimer: "Recommendation synthesis assisted by Gemini 2.5 Flash Lite",

    // Footer
    footerText:
      'This tool accompanies a manuscript currently under peer review. Source code is available at <a href="https://github.com/ac5907846/kmic" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:none">github.com/ac5907846/kmic</a>. Full methodological details and citation information will be provided upon publication.',

    // Segment group labels
    segGroups: {
      "Construction firms": "Construction firms",
      "Engineering/design firms": "Engineering/design firms",
      Large: "Large",
      "Small/medium": "Small/medium",
    },

    // Component names
    compNames: {
      C1: "Mutual Trust & Collaboration",
      C2: "Organizational Values & Norms",
      C3: "Information & Communication Systems",
      C4: "Organizational Policies",
      C5: "Employee Empowerment",
    },
    compShortNames: {
      C1: "Trust & Collaboration",
      C2: "Values & Norms",
      C3: "Info & Comm Systems",
      C4: "Org Policies",
      C5: "Empowerment",
    },
    compSubtitles: {
      C1: "e.g., trusting colleagues, supporting each other, collaborating willingly",
      C2: "e.g., encouraging knowledge sharing, innovation, and continuous learning",
      C3: "e.g., using communication tools, databases, and expert networks effectively",
      C4: "e.g., having clear written policies that guide daily operations",
      C5: "e.g., giving employees authority to make decisions and take action",
    },
    compRadarNames: {
      C1: "Mutual Trust &\nCollaboration",
      C2: "Organizational\nValues & Norms",
      C3: "Information &\nComm Systems",
      C4: "Organizational\nPolicies",
      C5: "Employee\nEmpowerment",
    },

    // Factor descriptions
    factors: {
      C11: "Trust in colleagues' abilities",
      C12: "Trust in colleagues' attitudes to work toward organizational goals",
      C13: "Trust in colleagues' decisions toward organizational interests",
      C14: "Employees' willingness to collaborate with others",
      C15: "Employees' willingness to support others",
      C16: "Employees' willingness to take responsibility in coordination",
      C21: "Promoting knowledge sharing",
      C22: "Facilitating employees to foster knowledge and skills",
      C23: "Promoting strategic collaborations to acquire knowledge",
      C24: "Encouraging employees to be creative and innovative at work",
      C25: "Facilitating employees' experiential learning",
      C31: "Effective use of internal communication channels",
      C32: "Effective use of external communication channels",
      C33: "Information systems available for sharing experience and knowledge",
      C34: "Information system available for managerial activities",
      C35: "Encouraging interactions with experts",
      C41: "Operations aligning with firm policies",
      C42: "External and internal communications aligning with firm policies",
      C43: "Firm policies available in writing",
      C51: "Empowering employees to take action within authority",
      C52: "Empowering employees to make decisions",
    },

    // Levels
    levels: {
      "Very High": "Very High",
      High: "High",
      Moderate: "Moderate",
      Low: "Low",
      "Very Low": "Very Low",
    },

    // AI prompt language instruction
    aiLangInstruction: "",
  },
  vi: {
    badge: "Khảo sát KMIC",
    headerTitle1: "Hạ tầng Quản lý",
    headerTitle2: "Tri thức",
    headerTitle3: "Tổ chức",
    headerSub: (n) =>
      `Tổ chức của bạn tạo lập, chia sẻ và áp dụng tri thức hiệu quả đến mức nào? Đánh giá năm khía cạnh chính và so sánh chuẩn với ${n} doanh nghiệp kiến trúc, kỹ thuật và xây dựng (A/E/C) bằng mô hình Chỉ số KMIC dựa trên phương pháp Đánh giá Tổng hợp Mờ (FSE).`,
    whatIsTitle: "Chỉ số KMIC là gì?",
    whatIsBody:
      "Chỉ số này đo lường mức độ sẵn sàng của nền tảng tổ chức trong việc hỗ trợ quản lý tri thức, bao gồm năm lĩnh vực: sự tin tưởng và hợp tác giữa nhân viên, văn hóa và giá trị tổ chức, hệ thống thông tin, các chính sách bằng văn bản, và trao quyền cho nhân viên. Điểm số càng cao (gần 5) nghĩa là năng lực nền tảng càng mạnh cho việc tạo lập, chia sẻ và áp dụng tri thức hiệu quả.",

    back: "\u2190 Quay lại",
    nextPrefix: "Tiếp:",
    calculate: "\u2733 Tính Chỉ số KMIC",
    startOver: "\u21BA Bắt đầu lại",

    rateInstruction:
      "Đánh giá từng yếu tố từ 1 (Rất thấp) đến 5 (Rất cao)",
    veryLow: "Rất thấp",
    veryHigh: "Rất cao",

    yourOrgIndex: "Chỉ số KMIC của Tổ chức",
    scoreLabel: (score) => `Điểm: ${score} trên thang 1 đến 5`,
    percentile: "phân vị",
    percentileDesc: (p, n) =>
      `Điểm của bạn cao hơn ${p}% trong số ${n} doanh nghiệp A/E/C được khảo sát`,

    surveyAvg: (v) => `Trung bình khảo sát: ${v}`,
    veryLowScale: "1.0 Rất thấp",
    moderateScale: "3.0 Trung bình",
    veryHighScale: "5.0 Rất cao",

    whereYouStand: "Vị trí của Bạn",
    whereYouStandDesc: (n) =>
      `Phân bố điểm Chỉ số KMIC trên ${n} tổ chức được khảo sát`,

    componentBreakdown: "Phân tích theo Thành phần",
    componentBreakdownDesc:
      "So sánh tổ chức của bạn trên năm chiều KMIC",
    fseTitle: "Sử dụng phương pháp Đánh giá Tổng hợp Mờ (FSE)",
    fseDesc: (n) =>
      `Khác với việc tính trung bình đơn giản, phân tích này sử dụng phương pháp FSE để phản ánh đầy đủ cách ${n} doanh nghiệp được khảo sát thực sự phản hồi. Thay vì rút gọn mọi thứ thành một con số duy nhất, thanh màu bên dưới cho thấy phân bố phản hồi trên năm mức (Rất thấp đến Rất cao), giúp bạn thấy được phần lớn doanh nghiệp tập trung ở đâu và ý kiến phân tán ra sao. Nhóm của doanh nghiệp bạn được tô đậm. Thanh thang điểm bên dưới hiển thị điểm chính xác của bạn (chấm vàng) so với trung bình khảo sát (vạch xám) trên thang 1 đến 5.`,
    distLabels: ["Rất thấp", "Thấp", "Trung bình", "Cao", "Rất cao"],
    yourFirmInCategory: (label, pct) =>
      `Doanh nghiệp của bạn thuộc nhóm <strong>${label}</strong> (${pct}% doanh nghiệp cũng nằm trong nhóm này)`,
    yourScore: "Điểm của bạn:",
    benchmark: "Chuẩn đối sánh:",
    aboveTypical: (pct) => `cao hơn ${pct}% so với điển hình`,
    belowTypical: (pct) => `thấp hơn ${pct}% so với điển hình`,

    profileTitle: "Hồ sơ KMIC & So sánh Đồng nghiệp",
    profileDesc:
      "Hồ sơ tổ chức của bạn so với các nhóm đồng nghiệp",
    allFirms: "Tất cả Doanh nghiệp",
    firmType: "Loại Doanh nghiệp",
    firmSize: "Quy mô Doanh nghiệp",
    selectGroupHint:
      "Chọn một nhóm ở trên, hoặc xem tất cả doanh nghiệp theo mặc định",
    yourOrg: "Tổ chức của bạn",
    peerBenchmark: "Chuẩn đối sánh",
    higherThanPeers: "cao hơn đồng nghiệp",
    lowerThanPeers: "thấp hơn đồng nghiệp",

    methodTitle: "Phương pháp Tính toán",
    methodDesc: "Tổng quan ngắn gọn về các phương pháp đằng sau điểm số của bạn",
    methodFSETitle: "Đánh giá Tổng hợp Mờ (FSE)",
    methodFSEBody: (n) =>
      `Điểm số của bạn được tính bằng phương pháp FSE, một kỹ thuật đánh giá đa tiêu chí được thiết kế cho các tình huống cần tổng hợp các đánh giá chủ quan thành chỉ số định lượng. Thay vì coi xếp hạng Likert là trung bình đơn giản, FSE bảo toàn toàn bộ phân bố phản hồi thông qua các hàm thành viên, nắm bắt tỷ lệ người trả lời ở mỗi mức đánh giá. Các hàm thành viên này sau đó được kết hợp bằng trọng số phái sinh để tạo ra chỉ số KMIC ở cấp thành phần và tổng thể.`,
    methodFormulaTitle: "Công thức Chỉ số KMIC",
    methodFormulaBody: (n) =>
      `Chỉ số KMIC được tính là KMIC = \u03A3(OW<sub>ij</sub> \u00D7 RS<sub>ij</sub>), trong đó OW<sub>ij</sub> là trọng số tổng thể của mỗi yếu tố (phái sinh từ hệ số tải CFA và trọng số nhóm FSE) và RS<sub>ij</sub> là điểm đánh giá của bạn. Công thức này tích hợp cả tầm quan trọng thống kê và trọng số thực nghiệm từ ${n} người tham gia khảo sát.`,
    methodClassTitle: "Phân loại: Tiêu chí Độ tin cậy",
    methodClassBody:
      "Mỗi điểm số được phân loại thành một mức (từ Rất thấp đến Rất cao) bằng tiêu chí độ tin cậy với lambda = 0.5. Phương pháp này tích lũy thành viên từ mức cao nhất xuống cho đến khi giá trị tích lũy đạt 50%. Mức mà ngưỡng này được vượt qua sẽ xác định phân loại. Cách này mạnh mẽ hơn nguyên tắc thành viên tối đa đơn giản vì tránh được các trường hợp biên khi mức cao nhất chỉ dẫn đầu sít sao. Phương pháp này tuân theo tài liệu FSE đã được thiết lập (Xu et al., 2010; Osei-Kyei and Chan, 2017).",
    methodBenchTitle: "Dữ liệu Chuẩn đối sánh",
    methodBenchBody: (n) =>
      `Tất cả chuẩn đối sánh đến từ khảo sát ${n} chuyên gia A/E/C tại Việt Nam, được xác nhận qua phân tích nhân tố khẳng định (CFA) với độ tin cậy cấu trúc cao (CR > 0.7, AVE > 0.5 cho hầu hết thành phần). Kiểm định Mann-Whitney U xác nhận các yếu tố KMIC nhất quán giữa các loại và quy mô doanh nghiệp (p > 0.05), hỗ trợ khả năng áp dụng rộng rãi của chuẩn đối sánh trong ngành A/E/C.`,

    recTitle: "Khuyến nghị",
    recAnalyzing: "Đang phân tích hồ sơ của bạn...",
    recTryAgain: "\u21BB Thử lại",
    recRegenerate: "\u21BB Tạo lại",
    recDisclaimer:
      "Tổng hợp khuyến nghị được hỗ trợ bởi Gemini 2.5 Flash Lite",

    footerText:
      'Công cụ này đi kèm với bản thảo đang trong quá trình bình duyệt. Mã nguồn có sẵn tại <a href="https://github.com/ac5907846/kmic" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:none">github.com/ac5907846/kmic</a>. Chi tiết phương pháp luận và thông tin trích dẫn đầy đủ sẽ được cung cấp khi công bố.',

    segGroups: {
      "Construction firms": "Doanh nghiệp Xây dựng",
      "Engineering/design firms": "Doanh nghiệp Tư vấn thiết kế",
      Large: "Lớn",
      "Small/medium": "Nhỏ và vừa",
    },

    compNames: {
      C1: "Tin tưởng & Hợp tác",
      C2: "Giá trị & Chuẩn mực Tổ chức",
      C3: "Hệ thống Thông tin & Truyền thông",
      C4: "Chính sách Tổ chức",
      C5: "Trao quyền Nhân viên",
    },
    compShortNames: {
      C1: "Tin tưởng & Hợp tác",
      C2: "Giá trị & Chuẩn mực",
      C3: "Thông tin & Truyền thông",
      C4: "Chính sách Tổ chức",
      C5: "Trao quyền",
    },
    compSubtitles: {
      C1: "Ví dụ: tin tưởng đồng nghiệp, hỗ trợ lẫn nhau, sẵn sàng hợp tác",
      C2: "Ví dụ: khuyến khích chia sẻ tri thức, đổi mới và học hỏi liên tục",
      C3: "Ví dụ: sử dụng hiệu quả công cụ giao tiếp, cơ sở dữ liệu và mạng lưới chuyên gia",
      C4: "Ví dụ: có chính sách rõ ràng bằng văn bản hướng dẫn hoạt động hàng ngày",
      C5: "Ví dụ: trao cho nhân viên quyền ra quyết định và hành động",
    },
    compRadarNames: {
      C1: "Tin tưởng &\nHợp tác",
      C2: "Giá trị &\nChuẩn mực",
      C3: "Thông tin &\nTruyền thông",
      C4: "Chính sách\nTổ chức",
      C5: "Trao quyền\nNhân viên",
    },

    factors: {
      C11: "Tin tưởng vào năng lực của đồng nghiệp",
      C12: "Tin tưởng vào thái độ làm việc của đồng nghiệp hướng tới mục tiêu tổ chức",
      C13: "Tin tưởng vào quyết định của đồng nghiệp vì lợi ích tổ chức",
      C14: "Sự sẵn sàng hợp tác của nhân viên với người khác",
      C15: "Sự sẵn sàng hỗ trợ của nhân viên đối với người khác",
      C16: "Sự sẵn sàng chịu trách nhiệm của nhân viên trong phối hợp công việc",
      C21: "Thúc đẩy chia sẻ tri thức",
      C22: "Tạo điều kiện cho nhân viên phát triển kiến thức và kỹ năng",
      C23: "Thúc đẩy hợp tác chiến lược để thu nhận tri thức",
      C24: "Khuyến khích nhân viên sáng tạo và đổi mới trong công việc",
      C25: "Tạo điều kiện cho nhân viên học hỏi qua trải nghiệm",
      C31: "Sử dụng hiệu quả các kênh truyền thông nội bộ",
      C32: "Sử dụng hiệu quả các kênh truyền thông bên ngoài",
      C33: "Hệ thống thông tin để chia sẻ kinh nghiệm và tri thức",
      C34: "Hệ thống thông tin phục vụ hoạt động quản lý",
      C35: "Khuyến khích tương tác với chuyên gia",
      C41: "Hoạt động phù hợp với chính sách doanh nghiệp",
      C42: "Truyền thông nội bộ và bên ngoài phù hợp với chính sách doanh nghiệp",
      C43: "Chính sách doanh nghiệp có sẵn bằng văn bản",
      C51: "Trao quyền cho nhân viên hành động trong phạm vi thẩm quyền",
      C52: "Trao quyền cho nhân viên ra quyết định",
    },

    levels: {
      "Very High": "Rất cao",
      High: "Cao",
      Moderate: "Trung bình",
      Low: "Thấp",
      "Very Low": "Rất thấp",
    },

    aiLangInstruction: "\n\nIMPORTANT: Respond entirely in Vietnamese.",
  },
};

// ── FSE BENCHMARK DATA (from kmic_analysis_fse.py) ──
const B = {"overall":{"index":3.7663,"membership":[0.0241,0.0861,0.2428,0.3933,0.2537],"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.647},"n":220},"groupWeights":{"C1":0.2047,"C2":0.2125,"C3":0.201,"C4":0.2122,"C5":0.1696},"overallWeights":{"C11":0.0305,"C12":0.0347,"C13":0.032,"C14":0.0344,"C15":0.0374,"C16":0.0358,"C21":0.0427,"C22":0.0408,"C23":0.0456,"C24":0.0413,"C25":0.0421,"C31":0.0385,"C32":0.0397,"C33":0.0429,"C34":0.0403,"C35":0.0395,"C41":0.0729,"C42":0.0863,"C43":0.0529,"C51":0.0915,"C52":0.0781},"components":{"C1":{"name":"Mutual Trust & Collaboration","shortName":"Trust & Collaboration","importantIndex":3.7782,"groupWeight":0.2047,"membership":[0.0084,0.0783,0.2609,0.4316,0.2208],"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6524},"rank":3,"factors":{"C11":{"desc":"Trust in colleagues' abilities","mean":3.605,"std":0.824,"membership":[0.0,0.0773,0.3818,0.4,0.1409],"importantIndex":3.6045,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.5409},"localWeight":0.1592,"ow":0.0305},"C12":{"desc":"Trust in colleagues' attitudes to work toward organizational goals","mean":3.641,"std":0.957,"membership":[0.0136,0.1045,0.3045,0.3818,0.1955],"importantIndex":3.6409,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.5773},"localWeight":0.1608,"ow":0.0347},"C13":{"desc":"Trust in colleagues' decisions toward organizational interests","mean":3.655,"std":0.926,"membership":[0.0136,0.0909,0.3045,0.4091,0.1818],"importantIndex":3.6545,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.5909},"localWeight":0.1614,"ow":0.032},"C14":{"desc":"Employees' willingness to collaborate with others","mean":3.927,"std":0.909,"membership":[0.0136,0.0636,0.1773,0.4727,0.2727],"importantIndex":3.9273,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7455},"localWeight":0.1735,"ow":0.0344},"C15":{"desc":"Employees' willingness to support others","mean":3.959,"std":0.883,"membership":[0.0091,0.0591,0.1773,0.4727,0.2818],"importantIndex":3.9591,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7545},"localWeight":0.1749,"ow":0.0374},"C16":{"desc":"Employees' willingness to take responsibility in coordination","mean":3.85,"std":0.876,"membership":[0.0,0.0773,0.2364,0.4455,0.2409],"importantIndex":3.85,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6864},"localWeight":0.1701,"ow":0.0358}}},"C2":{"name":"Organizational Values & Norms","shortName":"Values & Norms","importantIndex":3.9222,"groupWeight":0.2125,"membership":[0.0153,0.07,0.2219,0.3627,0.33],"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6928},"rank":1,"factors":{"C21":{"desc":"Promoting knowledge sharing","mean":4.082,"std":0.933,"membership":[0.0091,0.0591,0.1636,0.3773,0.3909],"importantIndex":4.0818,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7682},"localWeight":0.2084,"ow":0.0427},"C22":{"desc":"Facilitating employees to foster knowledge and skills","mean":3.786,"std":1.045,"membership":[0.0273,0.0818,0.2636,0.3318,0.2955],"importantIndex":3.7864,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6273},"localWeight":0.1934,"ow":0.0408},"C23":{"desc":"Promoting strategic collaborations to acquire knowledge","mean":3.691,"std":1.023,"membership":[0.0136,0.1182,0.2864,0.3273,0.2545],"importantIndex":3.6909,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.5818},"localWeight":0.1885,"ow":0.0456},"C24":{"desc":"Encouraging employees to be creative and innovative at work","mean":4.036,"std":0.945,"membership":[0.0136,0.05,0.1955,0.3682,0.3727],"importantIndex":4.0364,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7409},"localWeight":0.2061,"ow":0.0413},"C25":{"desc":"Facilitating employees' experiential learning","mean":3.986,"std":0.919,"membership":[0.0136,0.0455,0.2091,0.4045,0.3273],"importantIndex":3.9864,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7318},"localWeight":0.2036,"ow":0.0421}}},"C3":{"name":"Information & Communication Systems","shortName":"Info & Comm Systems","importantIndex":3.7083,"groupWeight":0.201,"membership":[0.0318,0.0944,0.2525,0.3764,0.2449],"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6213},"rank":4,"factors":{"C31":{"desc":"Effective use of internal communication channels","mean":3.805,"std":0.947,"membership":[0.0091,0.0909,0.2364,0.4136,0.25],"importantIndex":3.8045,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6636},"localWeight":0.2052,"ow":0.0385},"C32":{"desc":"Effective use of external communication channels","mean":3.627,"std":0.945,"membership":[0.0136,0.1136,0.2773,0.4227,0.1727],"importantIndex":3.6273,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.5955},"localWeight":0.1957,"ow":0.0397},"C33":{"desc":"Information systems available for sharing experience and knowledge","mean":3.668,"std":1.112,"membership":[0.05,0.0955,0.25,0.3455,0.2591],"importantIndex":3.6682,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6045},"localWeight":0.1979,"ow":0.0429},"C34":{"desc":"Information system available for managerial activities","mean":3.736,"std":1.116,"membership":[0.05,0.0864,0.2273,0.35,0.2864],"importantIndex":3.7364,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6364},"localWeight":0.2016,"ow":0.0403},"C35":{"desc":"Encouraging interactions with experts","mean":3.7,"std":1.056,"membership":[0.0364,0.0864,0.2727,0.35,0.2545],"importantIndex":3.7,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6045},"localWeight":0.1996,"ow":0.0395}}},"C4":{"name":"Organizational Policies","shortName":"Org Policies","importantIndex":3.9154,"groupWeight":0.2122,"membership":[0.0108,0.0656,0.1973,0.4498,0.2764],"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7263},"rank":2,"factors":{"C41":{"desc":"Operations aligning with firm policies","mean":4.032,"std":0.851,"membership":[0.0045,0.0409,0.1955,0.4364,0.3227],"importantIndex":4.0318,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7591},"localWeight":0.3437,"ow":0.0729},"C42":{"desc":"External and internal communications aligning with firm policies","mean":3.718,"std":0.893,"membership":[0.0,0.1091,0.25,0.4545,0.1864],"importantIndex":3.7182,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6409},"localWeight":0.3169,"ow":0.0863},"C43":{"desc":"Firm policies available in writing","mean":3.982,"std":0.955,"membership":[0.0273,0.05,0.15,0.4591,0.3136],"importantIndex":3.9818,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.7727},"localWeight":0.3394,"ow":0.0529}}},"C5":{"name":"Employee Empowerment","shortName":"Empowerment","importantIndex":3.1295,"groupWeight":0.1696,"membership":[0.1104,0.1782,0.3,0.2943,0.1171],"classification":{"level":"Medium","gradeIndex":3,"cumulativeMembership":0.7114},"rank":5,"factors":{"C51":{"desc":"Empowering employees to take action within authority","mean":3.268,"std":1.153,"membership":[0.0909,0.15,0.3,0.3182,0.1409],"importantIndex":3.2682,"classification":{"level":"Medium","gradeIndex":3,"cumulativeMembership":0.7591},"localWeight":0.5233,"ow":0.0915},"C52":{"desc":"Empowering employees to make decisions","mean":2.977,"std":1.172,"membership":[0.1318,0.2091,0.3,0.2682,0.0909],"importantIndex":2.9773,"classification":{"level":"Medium","gradeIndex":3,"cumulativeMembership":0.6591},"localWeight":0.4767,"ow":0.0781}}}},"percentileTable":{"0":2.0447,"1":2.333,"2":2.3717,"3":2.4674,"4":2.5157,"5":2.6471,"6":2.6938,"7":2.7153,"8":2.7607,"9":2.7879,"10":2.8047,"11":2.8986,"12":2.9501,"13":3.0157,"14":3.0604,"15":3.087,"16":3.1235,"17":3.1352,"18":3.1776,"19":3.1904,"20":3.199,"21":3.214,"22":3.2517,"23":3.2992,"24":3.3244,"25":3.3526,"26":3.3636,"27":3.3774,"28":3.3878,"29":3.416,"30":3.4435,"31":3.4689,"32":3.497,"33":3.5208,"34":3.539,"35":3.5458,"36":3.5633,"37":3.5885,"38":3.6,"39":3.6182,"40":3.6264,"41":3.632,"42":3.6493,"43":3.6623,"44":3.6793,"45":3.6972,"46":3.7108,"47":3.7424,"48":3.7468,"49":3.7564,"50":3.7695,"51":3.7846,"52":3.7938,"53":3.808,"54":3.8138,"55":3.8172,"56":3.8332,"57":3.8407,"58":3.848,"59":3.8615,"60":3.8698,"61":3.8739,"62":3.8862,"63":3.9066,"64":3.9343,"65":3.9568,"66":3.9825,"67":3.9993,"68":4.0067,"69":4.0212,"70":4.074,"71":4.0821,"72":4.0953,"73":4.1017,"74":4.1072,"75":4.1117,"76":4.1136,"77":4.1196,"78":4.131,"79":4.1664,"80":4.1934,"81":4.204,"82":4.2186,"83":4.2352,"84":4.2799,"85":4.3064,"86":4.3169,"87":4.3449,"88":4.3825,"89":4.408,"90":4.4476,"91":4.4802,"92":4.5293,"93":4.5988,"94":4.6493,"95":4.6615,"96":4.7274,"97":4.775,"98":4.7974,"99":4.8943,"100":4.9219},"eiHistogram":[{"binStart":2.0,"binEnd":2.25,"count":2,"pct":0.9},{"binStart":2.25,"binEnd":2.5,"count":7,"pct":3.2},{"binStart":2.5,"binEnd":2.75,"count":7,"pct":3.2},{"binStart":2.75,"binEnd":3.0,"count":13,"pct":5.9},{"binStart":3.0,"binEnd":3.25,"count":20,"pct":9.1},{"binStart":3.25,"binEnd":3.5,"count":22,"pct":10.0},{"binStart":3.5,"binEnd":3.75,"count":36,"pct":16.4},{"binStart":3.75,"binEnd":4.0,"count":41,"pct":18.6},{"binStart":4.0,"binEnd":4.25,"count":35,"pct":15.9},{"binStart":4.25,"binEnd":4.5,"count":17,"pct":7.7},{"binStart":4.5,"binEnd":4.75,"count":12,"pct":5.5},{"binStart":4.75,"binEnd":5.0,"count":8,"pct":3.6}],"segmented":{"firmType":{"Construction firms":{"n":113,"overallIndex":3.7665,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6485},"components":{"C1":{"importantIndex":3.8038,"membership":[0.0118,0.0632,0.2646,0.4304,0.2301]},"C2":{"importantIndex":3.8915,"membership":[0.0158,0.0665,0.2326,0.3809,0.3043]},"C3":{"importantIndex":3.7084,"membership":[0.0245,0.0898,0.2671,0.3902,0.2285]},"C4":{"importantIndex":3.8817,"membership":[0.0092,0.0605,0.2066,0.4869,0.2368]},"C5":{"importantIndex":3.2118,"membership":[0.0839,0.1715,0.3006,0.3369,0.1071]}}},"Engineering/design firms":{"n":107,"overallIndex":3.7688,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6463},"components":{"C1":{"importantIndex":3.7517,"membership":[0.0047,0.0941,0.257,0.4329,0.2112]},"C2":{"importantIndex":3.955,"membership":[0.0148,0.0737,0.2104,0.344,0.3572]},"C3":{"importantIndex":3.7103,"membership":[0.0395,0.0986,0.2368,0.3623,0.2628]},"C4":{"importantIndex":3.9536,"membership":[0.0124,0.0709,0.1869,0.4104,0.3194]},"C5":{"importantIndex":3.0437,"membership":[0.1379,0.1852,0.2996,0.2496,0.1276]}}}},"firmSize":{"Large":{"n":91,"overallIndex":3.8141,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6694},"components":{"C1":{"importantIndex":3.81,"membership":[0.011,0.0691,0.2453,0.4477,0.2268]},"C2":{"importantIndex":3.9345,"membership":[0.0132,0.057,0.2294,0.3828,0.3176]},"C3":{"importantIndex":3.8021,"membership":[0.0284,0.0725,0.2495,0.3676,0.2819]},"C4":{"importantIndex":4.0014,"membership":[0.0039,0.0642,0.1523,0.4861,0.2935]},"C5":{"importantIndex":3.1299,"membership":[0.1038,0.1921,0.302,0.2744,0.1277]}}},"Small/medium":{"n":129,"overallIndex":3.7342,"classification":{"level":"High","gradeIndex":4,"cumulativeMembership":0.6318},"components":{"C1":{"importantIndex":3.7564,"membership":[0.0064,0.0847,0.2716,0.4205,0.2167]},"C2":{"importantIndex":3.9149,"membership":[0.0167,0.0787,0.2165,0.3492,0.3389]},"C3":{"importantIndex":3.6423,"membership":[0.0341,0.11,0.2543,0.3828,0.2188]},"C4":{"importantIndex":3.8576,"membership":[0.0155,0.0663,0.2289,0.4236,0.2657]},"C5":{"importantIndex":3.1299,"membership":[0.115,0.1679,0.2987,0.309,0.1094]}}}}},"correlations":{"C1-C2":0.5974,"C1-C3":0.6257,"C1-C4":0.4857,"C1-C5":0.2968,"C2-C3":0.5943,"C2-C4":0.4042,"C2-C5":0.276,"C3-C4":0.5234,"C3-C5":0.2352,"C4-C5":0.102}};

const COMP_KEYS = ["C1","C2","C3","C4","C5"];
const COMP_RANKED = [...COMP_KEYS].sort((a,b) => B.components[a].rank - B.components[b].rank);
const COMP_COLORS_MAP = {"C1":"#3B6BDB","C2":"#B8922E","C3":"#1E9960","C4":"#CC7A2E","C5":"#CC3E3E"};
const COMP_ICONS_MAP = {"C1":"\u2665","C2":"\u2733","C3":"\u2699","C4":"\u2696","C5":"\u26A1"};
const COMP_BG_MAP = {"C1":"rgba(59,107,219,0.12)","C2":"rgba(184,146,46,0.12)","C3":"rgba(30,153,96,0.12)","C4":"rgba(204,122,46,0.12)","C5":"rgba(204,62,62,0.12)"};
const DIST_COLORS = ["#CC3E3E","#CC7A2E","#7A8BA2","#3B6BDB","#1E9960"];

function getLevel(idx) {
  if (idx >= 4.2) return { text: "Very High", color: "#1E9960" };
  if (idx >= 3.4) return { text: "High", color: "#3B6BDB" };
  if (idx >= 2.6) return { text: "Moderate", color: "#CC7A2E" };
  if (idx >= 1.8) return { text: "Low", color: "#CC3E3E" };
  return { text: "Very Low", color: "#CC3E3E" };
}

function getPercentile(score) {
  const table = B.percentileTable;
  const keys = Object.keys(table).map(Number).sort((a,b) => a - b);
  for (let i = keys.length - 1; i >= 0; i--) {
    if (score >= table[String(keys[i])]) return keys[i];
  }
  return 0;
}

// ── Styles ──
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#F0F2F7;--card:#FFFFFF;--input:#E8EBF2;--border:#D0D5E0;--accent:#3B6BDB;--accent-l:#4A7AE8;--glow:rgba(59,107,219,0.08);--t1:#1A2438;--t2:#4A5568;--t3:#7A8599;--gold:#996E1A;--gold-l:#B8922E;--green:#1E9960;--orange:#CC7A2E;--red:#CC3E3E;--r:12px;--rs:8px}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--t1);line-height:1.6;-webkit-font-smoothing:antialiased;margin:0}
.app{max-width:960px;margin:0 auto;padding:0 20px 60px}
.hdr{padding:48px 0 32px;text-align:center;position:relative;overflow:hidden}
.hdr::before{content:'';position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,var(--glow) 0%,transparent 70%);pointer-events:none}
.badge{display:inline-flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:100px;padding:6px 16px 6px 8px;font-size:12px;font-weight:600;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.badge .dot{width:8px;height:8px;background:var(--gold);border-radius:50%}
.hdr h1{font-family:'DM Serif Display',serif;font-size:clamp(28px,5vw,44px);font-weight:400;line-height:1.15;margin-bottom:12px;position:relative}
.hdr h1 span{color:var(--gold)}
.hdr .sub{color:var(--t2);font-size:clamp(14px,2.5vw,16px);max-width:640px;margin:0 auto}
.lang-toggle{position:absolute;top:48px;right:0;display:flex;background:var(--card);border:1px solid var(--border);border-radius:100px;padding:3px;z-index:10;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.lang-btn{padding:6px 14px;border-radius:100px;border:none;font-size:12px;font-weight:700;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .2s;background:transparent;color:var(--t3);letter-spacing:.5px}
.lang-btn.active{background:var(--accent);color:#fff}
.lang-btn:hover:not(.active){color:var(--t1)}
.stepper{display:flex;align-items:center;justify-content:center;margin:32px auto 36px;max-width:680px;padding:0 8px}
.step-item{display:flex;align-items:center;flex:1}
.sc{width:36px;height:36px;min-width:36px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--t3);background:var(--card);transition:all .3s;position:relative;z-index:1}
.sc.active{border-color:var(--accent);color:#fff;background:var(--accent);box-shadow:0 0 20px var(--glow)}
.sc.done{border-color:var(--green);color:#fff;background:var(--green)}
.sl{flex:1;height:2px;background:var(--border);transition:background .3s}.sl.done{background:var(--green)}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px;margin-bottom:20px;animation:fu .4s ease;box-shadow:0 1px 4px rgba(0,0,0,0.05)}
@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.ch{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px}
.ci{width:42px;height:42px;min-width:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px}
.ch h2{font-family:'DM Serif Display',serif;font-size:20px;font-weight:400;line-height:1.3}
.ch p{font-size:13px;color:var(--t2);margin-top:4px}
.fr{padding:20px 0;border-bottom:1px solid var(--border);display:flex;flex-direction:column;align-items:center;text-align:center}
.fr:last-child{border-bottom:none}
.fd{font-size:14px;color:var(--t1);margin-bottom:14px;line-height:1.5;max-width:480px}
.rg{display:flex;gap:6px;justify-content:center}
.rb{width:52px;padding:10px 0;border:1px solid var(--border);border-radius:var(--rs);background:var(--input);color:var(--t2);font-size:14px;font-weight:600;cursor:pointer;transition:all .15s;text-align:center;font-family:'DM Sans',sans-serif}
.rb:hover{border-color:var(--accent);color:var(--t1)}
.rb.sel{background:var(--accent);border-color:var(--accent);color:#fff;box-shadow:0 2px 12px rgba(59,107,219,0.25)}
.rl{display:flex;justify-content:space-between;font-size:11px;color:var(--t3);margin-top:8px;width:284px}
.br{display:flex;gap:12px;margin-top:28px;flex-wrap:wrap}
.btn{padding:14px 28px;border-radius:var(--rs);font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;border:none;transition:all .2s}
.btn-p{background:var(--accent);color:#fff;flex:1}.btn-p:hover{background:var(--accent-l)}.btn-p:disabled{opacity:.4;cursor:not-allowed}
.btn-s{background:transparent;border:1px solid var(--border);color:var(--t2)}.btn-s:hover{border-color:var(--t2);color:var(--t1)}
.btn-g{background:linear-gradient(135deg,var(--gold),var(--gold-l));color:#fff;flex:1}.btn-g:hover{opacity:.9}.btn-g:disabled{opacity:.4;cursor:not-allowed}
.hero{text-align:center;padding:40px 20px}
.big-pct{font-family:'DM Serif Display',serif;font-size:80px;line-height:1;color:var(--gold);margin-bottom:4px}
.big-raw{font-size:16px;color:var(--t3);font-weight:500;margin-bottom:8px}
.slbl{font-size:14px;color:var(--t2);margin-bottom:4px}
.lvl{display:inline-block;padding:4px 14px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.5px;margin-top:8px;color:#fff}
.pctl{margin-top:20px;padding:20px;background:var(--input);border-radius:var(--rs);text-align:center}
.pctl-num{font-family:'DM Serif Display',serif;font-size:42px;color:var(--accent)}
.pctl-lbl{font-size:13px;color:var(--t2);margin-top:4px}
.bbar{position:relative;height:8px;background:var(--input);border-radius:100px;margin:20px 0 8px;overflow:visible}
.bfill{height:100%;border-radius:100px;transition:width 1s ease;background:var(--gold)}
.bmk{position:absolute;top:-6px;width:2px;height:20px;background:var(--t3);border-radius:1px}
.bmkl{position:absolute;top:18px;transform:translateX(-50%);font-size:10px;color:var(--t3);white-space:nowrap}
.bleg{display:flex;justify-content:space-between;font-size:11px;color:var(--t3);margin-top:16px}
.cr{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border)}
.cr:last-child{border-bottom:none}
.hist-outer{position:relative;padding:0 0 28px}
.hist-wrap{display:flex;align-items:flex-end;gap:2px;height:120px;padding:0;margin-left:32px}
.hist-bar{flex:1;border-radius:3px 3px 0 0;transition:height .6s ease;position:relative;min-width:0;background:var(--accent)}
.hist-bar-you{background:var(--gold) !important}
.hist-pct{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:600;color:var(--t3);white-space:nowrap}
.hist-x{display:flex;margin-left:32px;font-size:9px;color:var(--t3);margin-top:4px}
.hist-x span{flex:1;text-align:center}
.hist-y{position:absolute;left:0;top:0;bottom:28px;width:28px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;padding-right:4px;font-size:9px;color:var(--t3)}
.hist-marker{position:absolute;bottom:0;width:2px;background:var(--gold);border-radius:1px;z-index:2;transition:left .6s,height .6s}
.hist-arrow{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:var(--gold);white-space:nowrap;display:flex;flex-direction:column;align-items:center}
.hist-arrow::after{content:'';width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid var(--gold);margin-top:2px}
.method-box{background:var(--input);border:1px solid var(--border);border-radius:var(--rs);padding:20px;font-size:13px;line-height:1.7;color:var(--t2)}
.method-box h4{color:var(--t1);font-size:13px;font-weight:600;margin:14px 0 4px}.method-box h4:first-child{margin-top:0}
.rec-text{font-size:14px;line-height:1.8;color:var(--t2)}
.rec-text h4{color:var(--t1);margin:16px 0 6px;font-size:14px}.rec-text h4:first-child{margin-top:0}
.rec-text ul{padding-left:18px;margin:8px 0}.rec-text li{margin-bottom:4px}
.rec-text strong{color:var(--t1)}
.ai-ld{display:flex;align-items:center;gap:10px;color:var(--t3);font-size:14px}
.spin{width:18px;height:18px;border:2px solid var(--border);border-top-color:var(--gold);border-radius:50%;animation:sp .8s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.rec-disclaimer{text-align:right;font-size:11px;color:var(--t3);margin-top:16px;font-style:italic}
footer{text-align:center;padding:40px 20px;font-size:12px;color:var(--t3);border-top:1px solid var(--border);margin-top:48px}
@media(max-width:640px){.hdr{padding:32px 0 20px}.card{padding:20px 16px}.rb{width:48px}.rl{width:262px}.big-pct{font-size:56px}.btn{padding:14px 20px;font-size:14px}.sc{width:30px;height:30px;min-width:30px;font-size:12px}.pctl-num{font-size:32px}.hist-wrap{height:80px}.lang-toggle{position:relative;top:0;right:0;margin:0 auto 16px;justify-content:center}}
.app[data-lang="vi"]{font-family:'Be Vietnam Pro',sans-serif}
.app[data-lang="vi"] .hdr h1{font-family:'Be Vietnam Pro',sans-serif;font-weight:700}
.app[data-lang="vi"] .ch h2{font-family:'Be Vietnam Pro',sans-serif;font-weight:700}
.app[data-lang="vi"] .big-pct{font-family:'Be Vietnam Pro',sans-serif;font-weight:700}
.app[data-lang="vi"] .pctl-num{font-family:'Be Vietnam Pro',sans-serif;font-weight:700}
.app[data-lang="vi"] .btn{font-family:'Be Vietnam Pro',sans-serif}
.app[data-lang="vi"] .rb{font-family:'Be Vietnam Pro',sans-serif}
.app[data-lang="vi"] .lang-btn{font-family:'Be Vietnam Pro',sans-serif}

`;

// ── Sub-components ──

function LanguageToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle">
      <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
      <button className={`lang-btn ${lang === "vi" ? "active" : ""}`} onClick={() => setLang("vi")}>VI</button>
    </div>
  );
}

function Stepper({ current }) {
  const steps = [0,1,2,3,4,5];
  return (
    <div className="stepper">
      {steps.map((s,i) => (
        <div className="step-item" key={s} style={i===steps.length-1?{flex:0}:{}}>
          <div className={`sc ${s<current?"done":s===current?"active":""}`}>
            {s<current?"\u2713":s===5?"\u2713":s+1}
          </div>
          {i<steps.length-1&&<div className={`sl ${s<current?"done":""}`}/>}
        </div>
      ))}
    </div>
  );
}

function ComponentCard({ compKey, ratings, onRate, t }) {
  const comp = B.components[compKey];
  const factors = Object.entries(comp.factors);
  return (
    <div className="card">
      <div className="ch">
        <div className="ci" style={{background:COMP_BG_MAP[compKey],color:COMP_COLORS_MAP[compKey]}}>{COMP_ICONS_MAP[compKey]}</div>
        <div>
          <h2>{t.compNames[compKey]}</h2>
          <p>{t.rateInstruction}</p>
        </div>
      </div>
      {factors.map(([code]) => (
        <div className="fr" key={code}>
          <div className="fd">{t.factors[code]}</div>
          <div className="rg">
            {[1,2,3,4,5].map(v => (
              <button key={v} className={`rb ${ratings[code]===v?"sel":""}`} onClick={()=>onRate(code,v)}>{v}</button>
            ))}
          </div>
          <div className="rl"><span>{t.veryLow}</span><span>{t.veryHigh}</span></div>
        </div>
      ))}
    </div>
  );
}

function IndexHistogram({ userScore }) {
  const allBins = [];
  for (let s = 1.0; s < 5.0; s += 0.25) {
    const match = B.eiHistogram.find(b => Math.abs(b.binStart - s) < 0.01);
    allBins.push({ binStart: s, binEnd: s + 0.25, count: match ? match.count : 0, pct: match ? match.pct : 0 });
  }
  const maxPct = Math.max(...allBins.map(b => b.pct), 1);
  const niceMax = Math.ceil(maxPct / 10) * 10;
  const yTicks = [];
  for (let t = niceMax; t >= 0; t -= 10) yTicks.push(t);

  const userFrac = (userScore - 1.0) / 4.0;
  const userBinIdx = allBins.findIndex(b => userScore >= b.binStart && userScore < b.binEnd);

  return (
    <div className="hist-outer">
      <div className="hist-y">
        {yTicks.map(t => <span key={t}>{t}%</span>)}
      </div>
      <div className="hist-wrap" style={{position:"relative"}}>
        {allBins.map((b, i) => (
          <div key={i} className={`hist-bar ${i===userBinIdx?"hist-bar-you":""}`}
            style={{height: b.pct > 0 ? `${Math.max((b.pct/niceMax)*100, 2)}%` : "0%"}}
          >
            {b.pct >= 4 && <div className="hist-pct">{b.pct}%</div>}
          </div>
        ))}
        <div className="hist-marker" style={{left:`${userFrac*100}%`,height:"calc(100% + 4px)"}}>
          <div className="hist-arrow">You</div>
        </div>
      </div>
      <div className="hist-x">
        {[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].map(v => (
          <span key={v} style={{flex: v===5.0 ? 0 : 1, minWidth: v===5.0 ? 20 : 0}}>{v.toFixed(1)}</span>
        ))}
      </div>
    </div>
  );
}

function SegmentComparison({ compScores, userScore, t }) {
  const [segType, setSegType] = useState("all");
  const [segGroup, setSegGroup] = useState(null);
  const [hovered, setHovered] = useState(null);

  const segOptions = {
    firmType: { label: t.firmType, groups: Object.keys(B.segmented.firmType) },
    firmSize: { label: t.firmSize, groups: Object.keys(B.segmented.firmSize) },
  };

  let peerLabel = t.allFirms;
  let peerN = B.overall.n;
  let peerComponents = {};
  COMP_KEYS.forEach(k => { peerComponents[k] = { importantIndex: B.components[k].importantIndex }; });

  if (segType !== "all" && segGroup && B.segmented[segType]?.[segGroup]) {
    const sd = B.segmented[segType][segGroup];
    peerLabel = t.segGroups[segGroup] || segGroup;
    peerN = sd.n;
    peerComponents = sd.components;
  }

  const cx = 220, cy = 260, maxR = 150;
  const n = COMP_RANKED.length;

  function valToR(val) { return ((Math.max(1, Math.min(5, val)) - 1) / 4) * maxR; }
  function angleFor(i) { return (Math.PI * 2 * i) / n - Math.PI / 2; }
  function ptAt(i, val) {
    const r = valToR(val);
    const a = angleFor(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }
  function polyPoints(values) {
    return values.map((v, i) => { const p = ptAt(i, v); return `${p.x},${p.y}`; }).join(" ");
  }

  const userVals = COMP_RANKED.map(k => compScores[k]);
  const peerVals = COMP_RANKED.map(k => peerComponents[k].importantIndex);
  const gridLevels = [1, 2, 3, 4, 5];

  return (
    <div className="card">
      <div className="ch"><div><h2>{t.profileTitle}</h2><p>{t.profileDesc}</p></div></div>

      <div style={{display:"flex",gap:0,marginBottom:16,background:"var(--input)",borderRadius:8,padding:3,border:"1px solid var(--border)"}}>
        <button
          onClick={() => { setSegType("all"); setSegGroup(null); }}
          style={{
            flex:1,padding:"10px 12px",borderRadius:6,border:"none",fontSize:13,fontWeight:600,
            fontFamily:"DM Sans,sans-serif",cursor:"pointer",transition:"all .2s",
            background: segType==="all" ? "var(--accent)" : "transparent",
            color: segType==="all" ? "#fff" : "var(--t2)",
          }}>
          {t.allFirms} (n={B.overall.n})
        </button>
        {Object.entries(segOptions).map(([key, opt]) => (
          <button key={key}
            onClick={() => { setSegType(key); setSegGroup(null); }}
            style={{
              flex:1,padding:"10px 12px",borderRadius:6,border:"none",fontSize:13,fontWeight:600,
              fontFamily:"DM Sans,sans-serif",cursor:"pointer",transition:"all .2s",
              background: segType===key ? "var(--accent)" : "transparent",
              color: segType===key ? "#fff" : "var(--t2)",
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      {segType !== "all" && (
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16,justifyContent:"center"}}>
          {segOptions[segType].groups.map(g => {
            const isActive = segGroup === g;
            const gn = B.segmented[segType][g].n;
            return (
              <button key={g}
                onClick={() => setSegGroup(isActive ? null : g)}
                style={{
                  padding:"8px 18px",borderRadius:100,border: isActive ? "1px solid var(--gold)" : "1px solid var(--border)",
                  background: isActive ? "rgba(153,110,26,0.1)" : "transparent",
                  color: isActive ? "var(--gold)" : "var(--t2)",
                  fontSize:13,fontWeight:600,fontFamily:"DM Sans,sans-serif",cursor:"pointer",transition:"all .2s",
                }}>
                {t.segGroups[g] || g} <span style={{opacity:0.6,fontWeight:400}}>(n={gn})</span>
              </button>
            );
          })}
        </div>
      )}
      {segType !== "all" && !segGroup && (
        <p style={{color:"var(--t3)",fontSize:12,textAlign:"center",marginBottom:12}}>{t.selectGroupHint}</p>
      )}

      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:24}}>
        <svg viewBox="-80 0 600 540" style={{width:"100%",maxWidth:560}}>
          <defs>
            <filter id="glow-g"><feGaussianBlur stdDeviation="4" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {gridLevels.map(lv => {
            const r = valToR(lv);
            const pts = Array.from({length: n}, (_, i) => {
              const a = angleFor(i);
              return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            }).join(" ");
            return (
              <g key={lv}>
                <polygon points={pts} fill="none" stroke="#D0D5E0" strokeWidth="1"/>
                <text x={cx} y={cy - r - 4} fill="#7A8599" fontSize="9" textAnchor="middle">{lv}</text>
              </g>
            );
          })}

          {COMP_RANKED.map((_, i) => {
            const outerPt = ptAt(i, 5);
            return <line key={i} x1={cx} y1={cy} x2={outerPt.x} y2={outerPt.y} stroke="#D0D5E0" strokeWidth="1"/>;
          })}

          {(() => {
            const segments = [];
            for (let i = 0; i < n; i++) {
              const next = (i + 1) % n;
              const uP1 = ptAt(i, userVals[i]);
              const uP2 = ptAt(next, userVals[next]);
              const pP1 = ptAt(i, peerVals[i]);
              const pP2 = ptAt(next, peerVals[next]);
              const avgAbove = (userVals[i] + userVals[next]) / 2 >= (peerVals[i] + peerVals[next]) / 2;
              segments.push(
                <polygon key={i}
                  points={`${uP1.x},${uP1.y} ${uP2.x},${uP2.y} ${pP2.x},${pP2.y} ${pP1.x},${pP1.y}`}
                  fill={avgAbove ? "rgba(30,153,96,0.15)" : "rgba(204,62,62,0.15)"}
                  stroke="none"/>
              );
            }
            return segments;
          })()}

          <polygon points={polyPoints(peerVals)}
            fill="rgba(59,107,219,0.06)" stroke="#3B6BDB" strokeWidth="2"
            strokeDasharray="6 4" opacity="0.9"/>

          <polygon points={polyPoints(userVals)}
            fill="rgba(153,110,26,0.08)" stroke="#996E1A" strokeWidth="2.5"
            filter="url(#glow-g)"/>

          {COMP_RANKED.map((cKey, i) => {
            const uPt = ptAt(i, userVals[i]);
            const pPt = ptAt(i, peerVals[i]);
            const isH = hovered === cKey;
            const delta = userVals[i] - peerVals[i];
            const deltaPct = (delta / 4) * 100;

            const a = angleFor(i);
            const labelR = maxR + 48;
            const lx = cx + labelR * Math.cos(a);
            const ly = cy + labelR * Math.sin(a);
            const anchor = Math.abs(Math.cos(a)) < 0.15 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
            const lyOffset = Math.abs(Math.sin(a)) > 0.8 ? (Math.sin(a) > 0 ? 10 : -10) : 0;

            const nameLines = (t.compRadarNames[cKey] || "").split("\n");

            return (
              <g key={cKey}
                onMouseEnter={() => setHovered(cKey)}
                onMouseLeave={() => setHovered(null)}
                style={{cursor:"default"}}>
                <circle cx={pPt.x} cy={pPt.y} r={isH ? 6 : 4} fill="#3B6BDB" stroke="#fff" strokeWidth="2"/>
                <circle cx={uPt.x} cy={uPt.y} r={isH ? 7 : 5} fill="#996E1A" stroke="#fff" strokeWidth="2"/>

                {nameLines.map((line, li) => (
                  <text key={li} x={lx} y={ly - 20 + lyOffset + li * 14} fill={isH ? "#1A2438" : "#4A5568"}
                    fontSize={isH ? "12" : "11"} fontWeight={isH ? "700" : "500"}
                    textAnchor={anchor} dominantBaseline="central">
                    {line}
                  </text>
                ))}
                <text x={lx} y={ly + (nameLines.length - 1) * 14 - 2 + lyOffset} fill="#996E1A"
                  fontSize="11" fontWeight="700"
                  textAnchor={anchor} dominantBaseline="central">
                  You: {userVals[i].toFixed(2)}
                </text>
                <text x={lx} y={ly + (nameLines.length - 1) * 14 + 14 + lyOffset}
                  fill={delta > 0 ? "#1E9960" : delta < 0 ? "#CC3E3E" : "#7A8599"}
                  fontSize="10" fontWeight="600"
                  textAnchor={anchor} dominantBaseline="central">
                  {Math.abs(deltaPct).toFixed(0)}% {delta >= 0 ? t.higherThanPeers : t.lowerThanPeers}
                </text>
              </g>
            );
          })}

          <text x={cx} y={cy - 10} fill="#1A2438" fontSize="13" fontWeight="600" textAnchor="middle">{peerLabel}</text>
          <text x={cx} y={cy + 8} fill="#4A5568" fontSize="11" textAnchor="middle">n = {peerN}</text>
        </svg>

        <div style={{display:"flex",gap:24,justifyContent:"center",marginTop:4,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--t2)"}}>
            <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#996E1A" strokeWidth="2.5"/></svg>
            {t.yourOrg}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--t2)"}}>
            <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#3B6BDB" strokeWidth="2" strokeDasharray="4 3"/></svg>
            {t.peerBenchmark}
          </div>
        </div>
      </div>
    </div>
  );
}

function Recommendations({ ratings, t, lang }) {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true); setOutput(null); setError(null);

    let summary = "";
    COMP_KEYS.forEach(cKey => {
      const comp = B.components[cKey];
      let cs = 0;
      const factorLines = [];
      Object.entries(comp.factors).forEach(([code, f]) => {
        const r = ratings[code] || 0;
        cs += (f.ow / comp.groupWeight) * r;
        const diff = r - Math.round(f.mean);
        const diffLabel = diff > 0 ? `${diff} above avg` : diff < 0 ? `${Math.abs(diff)} below avg` : "at avg";
        factorLines.push(`  "${f.desc}": rated ${r}/5 (industry avg: ${f.mean.toFixed(1)}, ${diffLabel})`);
      });
      let total = 0;
      Object.entries(comp.factors).forEach(([code, f]) => { total += f.ow * (ratings[code]||0); });
      const delta = cs - comp.importantIndex;
      const pct = comp.importantIndex > 0 ? ((delta / comp.importantIndex) * 100).toFixed(1) : "0";
      summary += `${comp.name} -- firm score: ${cs.toFixed(2)}, industry benchmark: ${comp.importantIndex.toFixed(2)} (${delta >= 0 ? "+" : ""}${pct}% vs benchmark)\n`;
      factorLines.forEach(l => { summary += l + "\n"; });
      summary += "\n";
    });

    let kmicIndex = 0;
    COMP_KEYS.forEach(cKey => {
      Object.entries(B.components[cKey].factors).forEach(([code, f]) => {
        kmicIndex += f.ow * (ratings[code]||0);
      });
    });

    const prompt = `You are a knowledge management advisor writing practical recommendations for an architecture, engineering, and construction (A/E/C) firm in a developing country.

CONTEXT:
This firm completed a knowledge management infrastructure capability (KMIC) assessment. The model was validated through a survey of 220 A/E/C practitioners in Vietnam. It measures five areas:
- Mutual Trust & Collaboration: how well employees trust and work with each other
- Organizational Values & Norms: whether the culture encourages knowledge sharing, innovation, and learning
- Information & Communication Systems: how effectively the firm uses tools, databases, and expert networks
- Organizational Policies: whether clear written policies guide daily operations and communications
- Employee Empowerment: whether employees have authority to make decisions and take action

Industry-wide, employee empowerment is the weakest area due to centralized hierarchies. Organizational culture is the strongest enabler of knowledge management.

THIS FIRM'S RESULTS:
${summary}
Overall KMIC Index: ${kmicIndex.toFixed(3)} out of 5.0 (industry benchmark: ${B.overall.index})

WRITING RULES (follow strictly):
- NEVER use codes like C1, C2, C3, C11, C22, C33, C41, C51, etc. Always use the plain name (e.g., "employee empowerment" not "C5", "trust in colleagues" not "C11").
- Use simple, clear language that a non-academic manager can understand.
- No citations or references to research papers.
- No filler phrases like "This is consistent with..." or "Research suggests...".

FORMAT:
1. Start with one short sentence on the firm's overall position relative to the benchmark.
2. Then give 3 to 5 numbered recommendations. Each recommendation should:
   - Name the area plainly (e.g., "Employee Empowerment" or "Information Systems")
   - State one specific action to take
   - Keep it to 1-2 sentences max
   - Prioritize the weakest areas first
3. End with one sentence noting the firm's strongest area as a strength to maintain (only if it is clearly above benchmark).

Total output must be under 200 words. Be direct. No fluff.${t.aiLangInstruction}`;

    try {
      const resp = await fetch("/api/recommend", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({prompt}) });
      const data = await resp.json();
      if (data.error) setError(data.error); else setOutput(data.result);
    } catch(e) { setError(`Connection failed: ${e.message}`); }
    setLoading(false);
  };

  useEffect(() => { generate(); }, []);

  const fmt = text => text
    .replace(/### (.*)/g,"<h4>$1</h4>")
    .replace(/## (.*)/g,"<h4>$1</h4>")
    .replace(/# (.*)/g,"<h4>$1</h4>")
    .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
    .replace(/\*(.*?)\*/g,"<em>$1</em>")
    .replace(/^- (.*)/gm,"<li>$1</li>")
    .replace(/^(\d+)\. (.*)/gm,"<li>$2</li>")
    .replace(/(<li>.*<\/li>)/gs,"<ul>$1</ul>")
    .replace(/<\/ul>\s*<ul>/g,"")
    .replace(/\n{2,}/g,"<br><br>")
    .replace(/\n/g,"<br>");

  return (
    <div className="card">
      <div className="ch">
        <div>
          <h2>{t.recTitle}</h2>
        </div>
      </div>

      {loading ? (
        <div className="ai-ld"><div className="spin"/>{t.recAnalyzing}</div>
      ) : error ? (
        <div>
          <p style={{color:"var(--red)",marginBottom:12}}>{error}</p>
          <button className="btn btn-s" style={{padding:"8px 16px",fontSize:12}} onClick={generate}>{t.recTryAgain}</button>
        </div>
      ) : output ? (
        <div>
          <div className="rec-text" dangerouslySetInnerHTML={{__html:fmt(output)}}/>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16,paddingTop:12,borderTop:"1px solid var(--border)"}}>
            <button className="btn btn-s" style={{padding:"8px 16px",fontSize:12}} onClick={generate}>{t.recRegenerate}</button>
            <span className="rec-disclaimer">{t.recDisclaimer}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResultsSection({ ratings, onReset, t, lang }) {
  const [animPct, setAnimPct] = useState(0);

  const compScores = {};
  let kmicIndex = 0;
  COMP_KEYS.forEach(cKey => {
    const comp = B.components[cKey];
    let cs = 0;
    Object.entries(comp.factors).forEach(([code, f]) => {
      kmicIndex += f.ow * (ratings[code]||0);
      cs += (f.ow / comp.groupWeight) * (ratings[code]||0);
    });
    compScores[cKey] = cs;
  });

  const pct = ((kmicIndex - 1) / 4) * 100;
  const percentile = getPercentile(kmicIndex);
  const level = getLevel(kmicIndex);

  useEffect(() => {
    const dur = 1200, start = performance.now();
    const tick = now => {
      const p = Math.min((now-start)/dur, 1);
      setAnimPct(pct * (1-Math.pow(1-p,3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [pct]);

  return (
    <div style={{animation:"fu .4s ease"}}>
      {/* Score Hero */}
      <div className="card">
        <div className="hero">
          <div className="slbl">{t.yourOrgIndex}</div>
          <div className="big-pct">{animPct.toFixed(1)}%</div>
          <div className="big-raw">{t.scoreLabel(kmicIndex.toFixed(3))}</div>
          <div className="lvl" style={{background:level.color}}>{t.levels[level.text] || level.text}</div>
        </div>

        <div className="pctl">
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:6}}>
            <span className="pctl-num">{percentile}<sup style={{fontSize:16,verticalAlign:"super"}}>{percentile===1?"st":percentile===2?"nd":percentile===3?"rd":"th"}</sup></span>
            <span style={{fontSize:16,color:"var(--t2)",fontWeight:500}}>{t.percentile}</span>
          </div>
          <div className="pctl-lbl">
            {t.percentileDesc(percentile, B.overall.n)}
          </div>
        </div>

        <div style={{padding:"16px 8px 0"}}>
          <div className="bbar">
            <div className="bfill" style={{width:`${((kmicIndex - 1) / 4) * 100}%`}}/>
            <div className="bmk" style={{left:`${((B.overall.index - 1) / 4) * 100}%`}}>
              <div className="bmkl">{t.surveyAvg(B.overall.index)}</div>
            </div>
          </div>
          <div className="bleg"><span>{t.veryLowScale}</span><span>{t.moderateScale}</span><span>{t.veryHighScale}</span></div>
        </div>
      </div>

      {/* Distribution histogram */}
      <div className="card">
        <div className="ch"><div><h2>{t.whereYouStand}</h2><p>{t.whereYouStandDesc(B.overall.n)}</p></div></div>
        <IndexHistogram userScore={kmicIndex}/>
      </div>

      {/* Component Breakdown */}
      <div className="card">
        <div className="ch"><div><h2>{t.componentBreakdown}</h2><p>{t.componentBreakdownDesc}</p></div></div>

        <div style={{background:"var(--input)",border:"1px solid var(--border)",borderRadius:6,padding:16,marginBottom:20,fontSize:12,lineHeight:1.8,color:"var(--t2)"}}>
          <strong style={{color:"var(--gold)",fontSize:13}}>{t.fseTitle}</strong>
          <br/>
          {t.fseDesc(B.overall.n)}
        </div>

        <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:20,justifyContent:"center"}}>
          {t.distLabels.map((l,i) => (
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"var(--t2)"}}>
              <span style={{width:10,height:10,borderRadius:2,background:DIST_COLORS[i],display:"inline-block",flexShrink:0}}/>{l}
            </div>
          ))}
        </div>

        {COMP_RANKED.map((cKey, idx) => {
          const bench = B.components[cKey];
          const userVal = compScores[cKey];
          const delta = userVal - bench.importantIndex;
          const deltaPct = bench.importantIndex > 0 ? ((userVal - bench.importantIndex) / bench.importantIndex * 100) : 0;
          const mem = bench.membership;
          const isLast = idx === COMP_RANKED.length - 1;

          const userGrade = Math.round(Math.max(1, Math.min(5, userVal)));
          const activeIdx = userGrade - 1;
          const activeLabel = t.distLabels[activeIdx];
          const activePct = (mem[activeIdx] * 100).toFixed(0);

          const userLinear = ((userVal - 1) / 4) * 100;
          const benchLinear = ((bench.importantIndex - 1) / 4) * 100;

          return (
            <div key={cKey} style={{paddingBottom:isLast?0:24,marginBottom:isLast?0:24,borderBottom:isLast?"none":"1px solid var(--border)"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontSize:12,color:"var(--t3)",fontWeight:600}}>#{bench.rank}</span>
                <span style={{fontSize:14,fontWeight:600,color:"var(--t1)"}}>{t.compNames[cKey]}</span>
                <span style={{fontSize:12,color:"var(--t3)"}}>({t.compSubtitles[cKey]})</span>
              </div>

              <div style={{marginLeft:22}}>
                <div style={{fontSize:12,color:"var(--t1)",marginBottom:4}}
                  dangerouslySetInnerHTML={{__html: t.yourFirmInCategory(activeLabel, activePct)}}/>

                <div style={{position:"relative"}}>
                  {(() => {
                    let arrowLeft = 0;
                    for (let i = 0; i < activeIdx; i++) arrowLeft += mem[i];
                    arrowLeft += mem[activeIdx] / 2;
                    return (
                      <div style={{position:"absolute",top:0,left:`${arrowLeft*100}%`,transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",zIndex:3}}>
                        <span style={{width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:"7px solid var(--gold)"}}/>
                      </div>
                    );
                  })()}
                  <div style={{display:"flex",height:28,borderRadius:4,overflow:"hidden",position:"relative",marginTop:10}}>
                    {mem.map((m, i) => (
                    <div key={i}
                      title={`${t.distLabels[i]}: ${(m*100).toFixed(1)}%`}
                      style={{
                        width:`${m*100}%`,
                        background:DIST_COLORS[i],
                        opacity: m < 0.01 ? 0 : (i === activeIdx ? 1 : 0.25),
                        height:28,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:11,fontWeight:700,
                        color: i === activeIdx ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                        cursor:"default",
                        transition:"opacity .4s",
                      }}>
                      {m >= 0.06 && `${(m*100).toFixed(0)}%`}
                    </div>
                  ))}
                </div>
                </div>

                <div style={{position:"relative",marginTop:14}}>
                  <div style={{height:6,background:"var(--input)",borderRadius:100,position:"relative",overflow:"visible"}}>
                    <div style={{height:"100%",borderRadius:100,background:COMP_COLORS_MAP[cKey],width:`${userLinear}%`,transition:"width .6s"}}/>
                    <div style={{position:"absolute",top:-4,left:`${benchLinear}%`,width:2,height:14,background:"var(--t3)",borderRadius:1}}/>
                    <div style={{position:"absolute",top:-5,left:`${userLinear}%`,width:12,height:12,borderRadius:"50%",background:"var(--gold)",border:"2px solid var(--card)",boxShadow:"0 0 8px rgba(153,110,26,0.35)",transform:"translateX(-50%)",transition:"left .6s"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10,color:"var(--t3)"}}>
                    <span>1.0</span><span>2.0</span><span>3.0</span><span>4.0</span><span>5.0</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
                    <div style={{fontSize:12,color:"var(--t2)"}}>
                      {t.yourScore} <span style={{fontWeight:700,color:"var(--gold)"}}>{userVal.toFixed(2)}</span>
                    </div>
                    <div style={{fontSize:12,color:"var(--t2)"}}>
                      {t.benchmark} <span style={{fontWeight:600,color:"var(--accent)"}}>{bench.importantIndex.toFixed(2)}</span>
                      <span style={{marginLeft:4,fontWeight:600,color:delta>0?"var(--green)":delta<0?"var(--red)":"var(--t3)"}}>
                        ({delta >= 0 ? t.aboveTypical(Math.abs(deltaPct).toFixed(0)) : t.belowTypical(Math.abs(deltaPct).toFixed(0))})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Peer comparison */}
      <SegmentComparison compScores={compScores} userScore={kmicIndex} t={t}/>

      {/* Methodology */}
      <div className="card">
        <div className="ch"><div><h2>{t.methodTitle}</h2><p>{t.methodDesc}</p></div></div>
        <div className="method-box">
          <h4>{t.methodFSETitle}</h4>
          {t.methodFSEBody(B.overall.n)}
          <h4>{t.methodFormulaTitle}</h4>
          <span dangerouslySetInnerHTML={{__html: t.methodFormulaBody(B.overall.n)}}/>
          <h4>{t.methodClassTitle}</h4>
          {t.methodClassBody}
          <h4>{t.methodBenchTitle}</h4>
          {t.methodBenchBody(B.overall.n)}
        </div>
      </div>

      {/* Recommendations */}
      <Recommendations ratings={ratings} t={t} lang={lang}/>

      <div className="br" style={{marginBottom:40}}>
        <button className="btn btn-s" onClick={onReset}>{t.startOver}</button>
      </div>
    </div>
  );
}

// ── Main ──
export default function KMICApp() {
  const [step, setStep] = useState(0);
  const [ratings, setRatings] = useState({});
  const [lang, setLang] = useState("en");

  const t = T[lang];

  const handleRate = (code, val) => setRatings(p => ({...p,[code]:val}));
  const isComplete = si => {
    if (si>=5) return true;
    const comp = B.components[COMP_KEYS[si]];
    return Object.keys(comp.factors).every(f => ratings[f] > 0);
  };
  const goNext = () => { setStep(s=>Math.min(s+1,5)); window.scrollTo({top:0,behavior:"smooth"}); };
  const goBack = () => { setStep(s=>Math.max(s-1,0)); window.scrollTo({top:0,behavior:"smooth"}); };
  const reset = () => { setRatings({}); setStep(0); window.scrollTo({top:0,behavior:"smooth"}); };

  return (
    <>
      <style>{css}</style>
      <div className="app" data-lang={lang}>
        <header className="hdr">
          <LanguageToggle lang={lang} setLang={setLang}/>
          <div className="badge"><span className="dot"/> {t.badge}</div>
          <h1>{t.headerTitle1}<br/>{t.headerTitle2} <span>{t.headerTitle3}</span></h1>
          <p className="sub">
            {t.headerSub(B.overall.n)}
          </p>
          <div style={{marginTop:16,padding:"12px 20px",background:"var(--card)",border:"1px solid var(--border)",borderRadius:8,maxWidth:600,marginLeft:"auto",marginRight:"auto",fontSize:13,color:"var(--t2)",lineHeight:1.7,textAlign:"left",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"}}>
            <strong style={{color:"var(--gold)"}}>{t.whatIsTitle}</strong> {t.whatIsBody}
          </div>
        </header>
        <Stepper current={step}/>
        {step<5 && (
          <div key={step}>
            <ComponentCard compKey={COMP_KEYS[step]} ratings={ratings} onRate={handleRate} t={t}/>
            <div className="br">
              {step>0&&<button className="btn btn-s" onClick={goBack}>{t.back}</button>}
              {step<4 ? (
                <button className="btn btn-p" disabled={!isComplete(step)} onClick={goNext}>
                  {t.nextPrefix} {t.compShortNames[COMP_KEYS[step+1]]} {"\u2192"}
                </button>
              ) : (
                <button className="btn btn-g" disabled={!isComplete(step)} onClick={goNext}>
                  {t.calculate}
                </button>
              )}
            </div>
          </div>
        )}
        {step===5 && <ResultsSection ratings={ratings} onReset={reset} t={t} lang={lang}/>}
        <footer>
          <p dangerouslySetInnerHTML={{__html: t.footerText}}/>
        </footer>
      </div>
    </>
  );
}
