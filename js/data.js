/* =========================================================
   Project Data - 7 Projects with STAR details
   ========================================================= */

const PROJECTS = {
  'crush-strap': {
    folder: 'crush-strap',
    cover: 'images/crush-strap/logo.jpg?v=2',
    coverPos: 'center 60%',
    gallery: {
      'KOL 合作': ['images/crush-strap/kol-1.png', 'images/crush-strap/kol-2.jpg'],
      '海外反馈': ['images/crush-strap/oversea-1.jpg', 'images/crush-strap/oversea-2.jpg'],
      '详情图': {
        '粉橘系列': ['images/crush-strap/detail-6.jpg','images/crush-strap/detail-o1.jpg','images/crush-strap/detail-1.jpg','images/crush-strap/detail-4.jpg'],
        '棕黑系列': ['images/crush-strap/detail-2.jpg','images/crush-strap/detail-3.jpg','images/crush-strap/detail-9.jpg','images/crush-strap/detail-7.jpg'],
      },
    },
    title: 'CRUSH STRAP 原创吉他背带品牌',
    subtitle: '品牌视觉 / 市场推广',
    role: '品牌视觉 / 市场推广',
    date: '2025.10 — 2026.03',
    blocks: [
      {
        no: '①',
        title: '创意 · 调研与产品设计',
        situation: '原创吉他背带品牌 CRUSH STRAP，处于从 0 到 1 的产品研发与品牌建设阶段；我的角色是产品研发设计 + 品牌视觉。',
        task: '研发设计产品系列，完成品牌视觉体系，建立差异化认知。',
        action: [
          '调研吉他手真实使用场景与高频痛点 — 金属扣易刮伤琴体、长时间演出肩颈负担重、风格切换需更换整条背带',
          '针对痛点反向设计 — 头层牛皮提升质感与耐用度、可换魔术贴实现快速切换、无金属防刮保护琴体',
          '产品线分两层：基础款 CR01（真皮）/ CR02（翻毛皮）覆盖主流，特殊系列「全城热恋」「金属狂潮」针对风格化演出'
        ],
        result: '双款产品视觉与品牌体系设计落地，差异化卖点明确（头层牛皮＋可换魔术贴＋无金属防刮）'
      },
      {
        no: '②',
        title: '内容 · 渠道 · 成果',
        situation: '产品与视觉体系完成，进入市场推广阶段，需要声量与销售转化。',
        task: '建联 KOL、对接展会、搭建海内外账号运营体系。',
        action: [
          '筛选与品牌调性匹配的音乐类 KOL（乐手 / 乐器评测向）',
          '调研上海乐器展、日本大阪 Sound Messe 等展会作为线下渠道触点',
          '搭建抖音 / INS 账号内容体系与海外渠道，将线上流量转化为询单与订单'
        ],
        result: '抖音粉丝 600+、INS 粉丝 797；承接多国用户咨询与订单，完成海外客群询单沟通、需求确认及下单转化'
      }
    ]
  },
  'showroom': {
    folder: 'showroom',
    cover: 'images/showroom/04.jpg?v=5',
    coverPos: '35% -5%',
    gallery: ['images/showroom/01.jpg','images/showroom/02.jpg','images/showroom/03.jpg','images/showroom/04.jpg?v=5'],
    title: '具所 juubicle 多品牌订货会',
    subtitle: '品牌内容运营 / 展区执行',
    role: '品牌内容运营 / 展区执行',
    date: '2025.08 — 2025.10',
    blocks: [
      {
        no: '①',
        title: '创意 · 内容运营',
        situation: '上海具所 juubicle 多品牌订货会，实习期间负责官方账号内容运营与展区搭建。',
        task: '统筹多品牌系列内容生产，保障品牌视觉统一呈现。',
        action: [
          '梳理多品牌各自的调性与产品风格差异',
          '调研买手与渠道商客群的信息获取习惯，决定内容形式与发布节奏',
          '统一拍摄、排版规范，以「拍摄 - 排版 - 发布」标准流程输出系列内容'
        ],
        result: '产出 12 条品牌传播物料，相关词条话题浏览量 2w+'
      },
      {
        no: '②',
        title: '执行 · 成果',
        situation: '订货会需要实际空间承载多品牌展示，吸引展商与买家。',
        task: '协助搭建 200㎡ 品牌展区，确保落地效果与品牌调性一致。',
        action: [
          '依据品牌视觉规范规划展区布局与动线，落地展区设计',
          '现场协助展位搭建与物料布置，确保多家展商顺利入驻'
        ],
        result: '200㎡ 品牌展区顺利落地，助力多家展商顺利入驻'
      }
    ]
  },
  'competition': {
    folder: 'competition',
    cover: 'images/competition/01.jpg?v=2',
    gallery: [
      { src: 'images/competition/01.jpg?v=2', cap: '品牌策划案 · 头版' },
      { src: 'images/competition/02.jpg?v=3', cap: '产品设计与研发' },
      { src: 'images/competition/07.jpg?v=4', cap: '竞品分析' },
      { src: 'images/competition/08.jpg?v=4', cap: '渠道偏好调研' },
      { src: 'images/competition/09.jpg?v=4', cap: '种草渠道与搜索词' },
      { src: 'images/competition/10.jpg?v=4', cap: 'SWOT 简析' },
      { src: 'images/competition/11.jpg?v=4', cap: '广告投放计划与效果' },
      { src: 'images/competition/12.jpg?v=4', cap: '活动内容与玩法' },
      { src: 'images/competition/13.jpg?v=4', cap: '活动优惠与礼品' },
      { src: 'images/competition/06.jpg?v=3', cap: '获奖证书 · 二等奖' }
    ],
    title: '安奈儿童装品牌营销案',
    subtitle: '商业策划 / 营销策略',
    role: '商业策划 / 营销策略',
    date: '第十三届全国大学生纺织贸易与商业策划创新能力大赛',
    blocks: [
      {
        no: '①',
        title: '创意 · 市场分析与策略',
        situation: '第十三届全国大学生纺织贸易与商业策划创新能力大赛·安奈儿品牌营销命题。',
        task: '开展市场调研与目标用户分析，完成人群定位、传播策略与营销活动规划。',
        action: [
          '童装市场规模 2024 年预计超 4000 亿、2025 年达 4738 亿',
          '消费者偏好线下源于方便试穿 88.14%、方便了解质量 79.05%',
          '质量与安全性首要考量（甲醛 80.63%、尖锐物 78.95%最受关注）',
          '种草渠道：短视频 67.16%、小红书 46.53%'
        ],
        result: '完成人群定位（中高端 0-12 岁，家长关注舒适品质，孩子关注时尚个性）、传播策略与营销活动规划'
      },
      {
        no: '②',
        title: '策略落地 · 方案与成果',
        situation: '形成「品牌定位 → 市场策略 → 渠道策略」完整链路后，进入方案输出。',
        task: '输出完整品牌营销商业策划案，覆盖代言人、渠道、活动全维度。',
        action: [
          '代言人：儿童演员 + 时尚博主',
          '线上（淘宝/天猫/抖音/小红书+私域）线下（主题店/快闪店）双渠道',
          '头部主播打造爆款 + 腰尾部 KOL 承接热度；综艺投放 + 跨界联名',
          '双十二活动：满额赠品、积分加倍、限时折扣、社交抽奖、预约试穿、门店优惠'
        ],
        result: '输出完整品牌营销商业策划案，获商业策划本科组二等奖'
      }
    ]
  },
  'anniversary': {
    folder: 'anniversary',
    cover: 'images/anniversary/04.jpg',
    gallery: ['images/anniversary/04.jpg','images/anniversary/02.jpg','images/anniversary/03.jpg','images/anniversary/05.jpg','images/anniversary/06.jpg','images/anniversary/07.jpg','images/anniversary/08.jpg'],
    title: 'AMOR 一周年纪念公演',
    subtitle: '演出企划 / 宣发统筹',
    role: '演出企划 / 宣发统筹',
    date: '2026.04 — 至今 · 杭州星途众元文化传媒',
    blocks: [
      {
        no: '①',
        title: '创意 · 内容 · 企划全案',
        situation: '杭州星途众元文化传媒实习；日常负责粉丝维护与物料对接，因表现突出升任一周年项目企划负责人。',
        task: '操盘嘉宾邀约、报批统筹、宣发落地全流程，保障演出顺利过审如期举办。',
        action: [
          '盘点可邀约团体资源，评估各团体风格、粉丝基础与档期',
          '按风格互补与热度梯度筛选，保证内容多元',
          '调研演出报批的资质 / 人员 / 节目合规要求，前置归档校验'
        ],
        result: '筛选洽谈确认 15 组参演团体，沟通档期、演出条件与合作条件，输出完整演出阵容；收集整理资质、人员、节目全套报批材料，统一归档校验后交付场地方代递交'
      },
      {
        no: '②',
        title: '渠道 · 数据成果',
        situation: '阵容与报批就绪，进入宣发落地阶段。',
        task: '推进主视觉海报、周边定制与三阶段宣发节奏。',
        action: [
          '推进主视觉海报 3 套、500 份周边定制',
          '微博三阶段宣发：预热蓄势 → 阵容官宣 → 现场引爆'
        ],
        result: '微博累计曝光 18.8w / 线下到场 300+ 人 / 旗下运营团体指名票 90 余张'
      }
    ]
  },
  'sugar-supply': {
    folder: 'sugar-supply',
    cover: 'images/sugar-supply/03.jpg',
    gallery: ['images/sugar-supply/03.jpg','images/sugar-supply/01.jpg','images/sugar-supply/02.jpg','images/sugar-supply/04.jpg','images/sugar-supply/05.jpg','images/sugar-supply/06.jpg'],
    title: '背影骑士拼盘企划系列',
    subtitle: '演出品牌策划与执行',
    role: '演出品牌策划与执行',
    date: '2024.10 — 2025.10 · 合肥背影庇护文化传媒',
    blocks: [
      {
        no: '①',
        title: '洞察 · 企划策略',
        situation: '合肥背影庇护文化传媒实习；企划出发点 — 安徽省内无常规偶像演出品牌，市场存在供给空白。',
        task: '打造系列化拼盘演出企划，填补市场空白并保障常态化落地。',
        action: [
          '摸底省内偶像团体存量与受众基础',
          '研究演出报批的文旅审核流程与材料要求',
          '以「系列化、可复制的演出产品」建立认知',
          '前置吃透报批流程，保障零风险复演'
        ],
        result: '统筹 20+ 偶像团体演出编排与多方资源对接，保障系列演出常态化落地；独立完成多份演出报批材料并一次性通过文旅审核，合规零风险'
      },
      {
        no: '②',
        title: '执行 · 成果呈现',
        situation: '系列化运营进入成熟期。',
        task: '持续输出演出物料与现场执行。',
        action: [
          '糖分补充企划系列（vol.10/11/12/13/21 等）海报物料设计与发布',
          '多方资源（场地 / 团体 / 票务）对接统筹'
        ],
        result: '系列演出常态化落地，形成固定演出品牌认知；多场次顺利执行'
      }
    ]
  },
  'matouyao': {
    folder: 'matouyao',
    cover: 'images/matouyao/slide-01.jpg',
    gallery: ['images/matouyao/slide-01.jpg','images/matouyao/slide-02.jpg','images/matouyao/slide-07.jpg','images/matouyao/slide-10.jpg','images/competition/03.jpg','images/competition/04.jpg','images/competition/05.jpg'],
    title: '马头窑文旅 · 织韵窑裳（含跑山节 IP）',
    subtitle: '文旅策划 / 活动 IP',
    role: '文旅策划 / 活动 IP',
    date: '省挑战杯 · 一等奖 · 2026',
    subTag: {
      label: '延伸 IP · 跑山节',
      tags: ['春赏樱', '夏跑山', '秋市集', '冬年味'],
      note: '入选创意设计专项赛路演'
    },
    blocks: [
      {
        no: '①',
        title: '创意 · 堪景洞察与策划',
        situation: '省挑战杯·马头窑文旅运营设计项目；现场堪景发现：后山利用率低，但拥有最好的视野与很大的空地；结合近两年热议的「回归自然」议题进行发散规划。',
        task: '策划山野露营地改造方案，完成场地规划、业态设计与盈利模式设计。',
        action: [
          '现场堪景评估各区域条件（后山视野、空地规模、动线可达性）',
          '调研年轻客群「回归自然」的露营 / 市集消费趋势与付费意愿',
          '后山利用率低 = 改造成本低、想象空间大；视野好 + 空地大 = 天然适合露营',
          '以「场地 × 业态 × 活动 IP」三位一体，形成可运营的文旅商业模型'
        ],
        result: '完成山野露营地改造方案 — 场地规划、业态设计与盈利模式设计'
      },
      {
        no: '②',
        title: 'IP 设计 · 跑山节（延伸 IP）',
        situation: '堪景与空间改造方案已定，需为核心景点打造可引流、可消费、可传播的 IP 活动矩阵。',
        task: '策划「跑山节」系列 IP 活动，形成「引流 → 出圈 → 留人」运营闭环。',
        action: [
          '梳理马头片区生态人文资源（千亩樱花园、明清老街、皖南山水）',
          '设计四季活动体系：春赏樱、夏跑山、秋市集、冬年味',
          '落地内容：皖山徽水·马跃泾川跑山赛 / 马头村 T 秀（樱花林户外秀场）/ 心动营地（15 项活动）/ 木艺布艺氛围标语',
          '设计国风周边（马头窑里茶具 / 茶品包装体系）'
        ],
        result: '完成跑山节 IP 全案策划，获省挑战杯大学生创业竞赛一等奖、项目入选创意设计专项赛路演'
      }
    ]
  },
  'wanda': {
    folder: 'wanda',
    cover: 'images/wanda/04.jpg',
    gallery: ['images/wanda/04.jpg','images/wanda/01.jpg','images/wanda/02.jpg','images/wanda/03.jpg','images/wanda/05.jpg'],
    title: '万达广场随机舞蹈活动',
    subtitle: '活动全案 / 现场执行',
    role: '活动全案 / 现场执行',
    date: '与渭南高新万达广场合作',
    blocks: [
      {
        no: '①',
        title: '创意 · 洞察与策划',
        situation: '与渭南高新万达广场合作（主体为万达）；二次元活动话题热度高，商场圆厅空间大，适合做企划提升人气引流；同时与商场内二次元文创店合作引流。',
        task: '活动全案策划与现场执行，为商场引流提人气。',
        action: [
          '调研二次元人群活跃场景与话题热度（随机舞蹈 / 宅舞受众）',
          '考察商场圆厅空间与动线，评估活动分区可行性',
          '圆厅空间大适合舞台 + 观众区 + 摊位区复合布局',
          '二次元话题自带传播性，能与商场内二次元文创店形成内容联动 + 客流互导'
        ],
        result: '整合商场、摊主、coser、表演者多方资源策划宣发，预热触达 1.2w+'
      },
      {
        no: '②',
        title: '执行 · 成果',
        situation: '现场执行与多方协调。',
        task: '现场分区管控动线、临场调度应对客流。',
        action: [
          '现场分区管控动线',
          '临场调度应对客流'
        ],
        result: '实际到场 400 人、活动好评 92%、带动商场相关业态客群流动、收获商户后续合作意向'
      }
    ]
  }
};
