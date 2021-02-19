let
    // _HOST = 'https://szw.futnow.cn/api/mini',
    // _HOST = "http://132.232.74.143:4440",
    // _HOST = "http://192.168.0.6:80",
    _HOST = "https://api.sqfzzl.com/api/mini",
    _UPHOST = 'https://upload-z2.qiniup.com',
    // _UPIMG = 'https://file.futnow.cn',//旧 图片拼接地址
    // _UPIMG = "https://szw.image.blackshell.cn",
    _UPIMG = "https://image.sqfzzl.com",
    // _WEATHER = 'https://wthrcdn.etouch.cn/weather_mini',
    // _WEATHER = 'https://api.map.baidu.com/telematics/v3/weather',
    _BAIDUMAPAK = 'KuYq6xc0j6t2l21DxGVqo4prqU6SCwLM',
    _POSITION = 'https://szw.futnow.cn/static/js/common/cities/',
    _ModifyHost = 'https://www.quweiquwei.com:5743';

module.exports = {
    host: _HOST,
    uphost: _UPHOST, //上传图片
    upimg: _UPIMG, //上传图片后的地址域名
    position: _POSITION, //地址
    baidumapak: _BAIDUMAPAK, //百度地图调用需要用到的key
    // Weather: _WEATHER, //地址
    //小程序信息
    appid: "wx50ce5f3ba10dcc1d",
    // secret: "90869a495a58366d9bca9851ca2ca63c",
    //api列表
    Common: {
        // 获取配置 是否开放视频
        getConfig: {
            reqUrl: _HOST + `/config/get`,
            reqData: {},
            reqType: "GET",
        },
    },
    Index: {
        //点赞文章
        like_article: {
            reqUrl: _ModifyHost + `/likeArticle`,
            reqData: {
                articleId: '',
                openid: ''
            },
            reqType: "GET"
        },

        //获取栏目列表
        column_list: {
            reqUrl: _ModifyHost + `/getChannelList`,
            reqData: {
                communityId: 'sqfzzl',
                parentId: '393827dc-6831-4708-a3be-35cc5af4bf88'
            },
            reqType: "GET"
        },

        //获取文章列表
        article_list: {
            reqUrl: _ModifyHost + `/getArticleList`,
            reqData: {
                companyId: 'sqfzzl',
                channelId: '',
                pageSize: 4,
                pageNo: 1,
                openid: ""
            },
            reqType: "GET"
        },

        //获取文章详情
        article_detail: {
            reqUrl: _ModifyHost + `/getArticleDetail`,
            reqData: {
                articleId: '',
                openid: ''
            },
            reqType: "GET"
        },

        //获取banner列表
        banner_list: {
            reqUrl: _HOST + `/banner/list`,
            reqData: {},
            reqType: "GET",
        },
        //获取推荐的新闻和视频
        getHotNewsInfoVideoInfoList: {
            reqUrl: _HOST + `/index/getHotNewsInfoVideoInfoList`,
            reqData: { "limit": 4 },
            reqType: "GET",
        },
        //获取最新的非推荐新闻和视频
        getNewsInfoVideoInfoList: {
            reqUrl: _HOST + `/index/getNewsInfoVideoInfoList`,
            reqData: {
                "page": 1,
                "limit": 10,
                "province": "", //（选填）
                "city": "", //（选填）
                "area": "", //（选填）
                "street": "", //（选填）
                "community": "", //（选填）
                "hot": "0", //（选填）是否推荐:0-不推荐，1-置顶，2-热门，3-推荐，4-本地
            },
            reqType: "GET",
        },
        //获取最新的非推荐新闻和视频
        getNewsInfoVideoInfoList_Area: {
            reqUrl: _HOST + `/index/getNewsInfoVideoInfoList`,
            reqData: {
                "page": 1,
                "limit": 10,
                "province": "", //（选填）
                "city": "", //（选填）
                "area": "", //（选填）
                "street": "", //（选填）
                "community": "", //（选填）
                "hot": "0", //（选填）是否推荐:0-不推荐，1-置顶，2-热门，3-推荐，4-本地
            },
            reqType: "GET",
        },
        //获取专题列表
        special_topic: {
            reqUrl: _HOST + `/special_topic/list`,
            reqData: {
                "page": 1,
                "limit": 6,
                "hot": 1, //（选填）是否推荐1-是，0-否
                "open_id": "", //（选填）微信openid如果有填写就返回关注的主题编号集合
            },
            reqType: "GET",
        },
        //专题详情
        special_topicDetails: {
            reqUrl: _HOST + `/special_topic/get`,
            reqData: {
                "id": "",
                "page": 1,
                "limit": 6,
                "open_id": "",
            },
            reqType: "GET",
        },
        //关注和取消主题关注
        attention: {
            reqUrl: _HOST + `/special_topic/attention`,
            reqData: {
                "open_id": "",
                "special_topic_id": "", //主题编号
                "type": 1, //类型：1-关注，0-取消关注
            },
            reqType: "GET",
        },
        //获取专题内容列表 首页党建
        getContentList: {
            reqUrl: _HOST + `/special_topic/getContentList`,
            reqData: {
                "page": 1,
                "limit": 10,
                "special_topic_id": "3", //所属专题编号 3是党建
                "hot": "", //（选填）是否推荐1-是，0-否
            },
            reqType: "GET",
        },
        //视频列表
        videolist: {
            reqUrl: _HOST + `/video_info/list`,
            reqData: {
                "page": 1,
                "limit": 10,
                "search_key": "", //（选填）搜索关键词
            },
            reqType: "GET",
        },
        //视频详情
        videoDetails: {
            reqUrl: _HOST + `/video_info/get`,
            reqData: {
                "id": "", //编号
                "open_id": "",
            },
            reqType: "GET",
        },
        //获取社区详情
        communityDetails: {
            reqUrl: _HOST + `/community/get`,
            reqData: {
                "id": "", //社区编号
            },
            reqType: "GET",
        },
        //判断是否关注社区
        isAttention: {
            reqUrl: _HOST + `/community_attention/isAttention`,
            reqData: {
                "open_id": "",
                "community_id": "",
            },
            reqType: "GET",
        },
        //关注社区
        community_attention: {
            reqUrl: _HOST + `/community_attention/attention`,
            reqData: {
                "open_id": "",
                "community_id": "",
            },
            reqType: "GET",
        },
        //取消关注社区
        cancenAttention: {
            reqUrl: _HOST + `/community_attention/cancenAttention`,
            reqData: {
                "open_id": "",
                "community_id": "",
            },
            reqType: "GET",
        },
        //通过经纬度获取最近的社区信息
        getRecently: {
            reqUrl: _HOST + `/community/getRecently`,
            reqData: {
                "longitude": "",
                "latitude": "",
            },
            reqType: "GET",
        },
        //获取默认社区信息
        getDefaultCommunity: {
            reqUrl: _HOST + `/community/getDefaultCommunity`,
            reqData: {},
            reqType: "GET",
        },
        //通过省市区街道社区等编码获取社区信息
        getByCode: {
            reqUrl: _HOST + `/community/getByCode`,
            reqData: {
                "province": "",
                "city": "",
                "area": "",
                "street": "",
                "community": "",
            },
            reqType: "GET",
        },
        //通过编码获取名称
        getNameByCode: {
            reqUrl: _HOST + `/cities/getNameByCode`,
            reqData: {
                "code": "", //要查询名称的编号
                "parent_code": "", //所属父栏目编号，如果是查询省的话该字段可不填
            },
            reqType: "GET",
        },
        //json地址
        position: {
            reqUrl: _POSITION,
            reqData: {},
            reqType: "GET",
        },
        //获取社区下拉列表
        getDropDownList: {
            reqUrl: _HOST + `/community/getDropDownList`,
            reqData: {
                "province": "",
                "city": "",
                "area": "",
                "street": "",
            },
            reqType: "GET",
        },
        //通过省市区街道编码获取社区信息列表
        getListByCode: {
            reqUrl: _HOST + `/community/getListByCode`,
            reqData: {
                "province": "",
                "city": "",
                "area": "",
                "street": "",
                "open_id": "",
                "longitude": "", //（选填）
                "latitude": "", //（选填）
                "page": 1,
                "limit": 20,
            },
            reqType: "GET",
        },
        //获取新闻和视频
        community_getNewsInfoVideoInfoList: {
            reqUrl: _HOST + `/community/getNewsInfoVideoInfoList`,
            reqData: {
                "page": 1,
                "limit": 10,
                "province": "", //（选填）
                "city": "", //（选填）
                "area": "", //（选填）
                "street": "", //（选填）
                "community_id": "", //（选填）
                "community_hot": "0", //（选填）是否推荐:0-不推荐，1-置顶
            },
            reqType: "GET",
        },
        //天气
        // getWeather: {
        //     reqUrl: _WEATHER,
        //     reqData: {
        //         // "city": ""
        //         // "citykey": ""
        //         "location": "",
        //         "latitude": "",
        //         "output": "json",
        //         "ak": "KuYq6xc0j6t2l21DxGVqo4prqU6SCwLM",
        //     },
        //     reqType: "GET",
        // },
        //新闻详情
        newsDetails: {
            reqUrl: _HOST + `/news_info/get`,
            reqData: {
                "id": "", //编号
                "open_id": "",
            },
            reqType: "GET",
        },
        //通过标签获取推荐的新闻
        getRecommendList: {
            reqUrl: _HOST + `/news_info/getRecommendList`,
            reqData: {
                "tags": [], //标签集合
                "self": "", //（选填）当前新闻或视频自己的编号
                "limit": "2", //获取多少条数据
            },
            reqType: "GET",
        },
        //新闻列表
        newslist: {
            reqUrl: _HOST + `/news_info/list`,
            reqData: {
                "page": 1,
                "limit": 10,
                "search_key": "", //（选填）搜索关键词
            },
            reqType: "GET",
        },
        //获取评论列表
        commentslist: {
            reqUrl: _HOST + `/comments/list`,
            reqData: {
                "open_id": "",
                "type": "1", //评论内容类型:1-新闻，2-视频，3-社区之声
                "content_id": "", //新闻或视频编号
                "page": 1,
                "limit": 10,
            },
            reqType: "GET",
        },
        //添加评论
        addComment: {
            reqUrl: _HOST + `/comments/addComment`,
            reqData: {
                "special_topic_info_id": "", //所属专题编号
                "parent_id": "0", //所属评论编号（回复评论轮的时候用到，不是回复传入0）
                "content": "", //评论内容
                "open_id": "",
                "type": "1", //评论内容类型:1-新闻，2-视频，3-社区之声
                "content_id": "", //新闻或视频编号
                "by_comment_id": "", //（选填）被评论编号
            },
            reqType: "GET",
        },
        //评论点赞
        CommentPraise: {
            reqUrl: _HOST + `/comments/praise`,
            reqData: {
                "open_id": "",
                "comment_id": "", //所属评论编号
            },
            reqType: "GET",
        },
        //取消点赞
        CommentCancenl: {
            reqUrl: _HOST + `/comments/cancenlPraise`,
            reqData: {
                "open_id": "",
                "comment_id": "", //所属评论编号
            },
            reqType: "GET",
        },
        // 获取我赞过的评论编号
        getMyPraise: {
            reqUrl: _HOST + `/comments/getMyPraise`,
            reqData: {
                "open_id": "",
            },
            reqType: "GET",
        },

        //内容点赞
        CommentPraiseCon: {
            reqUrl: _HOST + `/content_praise_record/praise`,
            reqData: {
                "open_id": "",
                "content_id": "", //话题编号
                "type": "1", //信息类型：1-新闻，2-视频,3-社区之声
            },
            reqType: "GET",
        },
        //取消内容点赞
        CommentCancenlCon: {
            reqUrl: _HOST + `/content_praise_record/cancelPraise`,
            reqData: {
                "open_id": "",
                "content_id": "", //话题编号
                "type": "1", //信息类型：1-新闻，2-视频,3-社区之声
            },
            reqType: "GET",
        },
        //获取内容点赞数量
        getPraiseNumber: {
            reqUrl: _HOST + `/content_praise_record/getPraiseNumber`,
            reqData: {
                "content_id": "", //内容编号
                "type": "1", //信息类型：1-新闻，2-视频,3-社区之声
            },
            reqType: "GET",
        },
        // 获取我赞过的内容编号列表
        getMyPraiseCon: {
            reqUrl: _HOST + `/content_praise_record/getMyPraiseIDList`,
            reqData: {
                "open_id": "",
                "type": "1", //信息类型：1-新闻，2-视频,3-社区之声
            },
            reqType: "GET",
        },
        // 获取我赞过的列表
        getMyPraiseConlist: {
            reqUrl: _HOST + `/content_praise_record/getMyPraiseList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '1', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "GET",
        },
        // 获取评论量
        commentNumber: {
            reqUrl: _HOST + `/comments/commentNumber`,
            reqData: {
                "content_id": "", //新闻或视频编号
                "type": "1", //评论内容类型:1-新闻，2-视频,3-社区之声
            },
            reqType: "GET",
        },
    },
    attention: {
        // 获取推荐的专题最新信息
        getRecentlyUpdateNewsInfoList: {
            reqUrl: _HOST + `/special_topic_attention/getRecentlyUpdateNewsInfoList`,
            reqData: {
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        // 获取我关注的专题最新信息
        getMyAttentionNewsInfoList: {
            reqUrl: _HOST + `/special_topic_attention/getMyAttentionNewsInfoList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        //  获取我关注的社区列表
        myAttentionList: {
            reqUrl: _HOST + `/community_attention/myAttentionList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 100,
            },
            reqType: "POST",
        },
    },
    property: {
        //  通过父栏目编号获取下面所有的子栏目
        getChildTreeListByParentID: {
            reqUrl: _HOST + `/navigation/getChildTreeListByParentID`,
            reqData: {
                "parent_id": "3", //所属栏目编号（社区之声固定为3）
            },
            reqType: "POST",
        },
        //  获取社区之声列表
        communitylist: {
            reqUrl: _HOST + `/community_voice/list`,
            reqData: {
                "navigation_id": "", //（选填）栏目编号
                "search_key": "", //（选填）搜索内容
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        //  获取社区之声详情
        communityvoiceDetails: {
            reqUrl: _HOST + `/community_voice/get`,
            reqData: {
                "id": "", //编号
                "open_id": "",
            },
            reqType: "POST",
        },
        //  获取图片上传token
        getUploadImageToken: {
            reqUrl: _HOST + `/upload/getUploadImageToken`,
            reqData: {
                "open_id": "",
            },
            reqType: "POST",
        },
        //  社区之声发布
        communityvoiceAdd: {
            reqUrl: _HOST + `/community_voice/add`,
            reqData: {
                'open_id': "", //luocheng微信openid
                'title': "", //社区之声发布测试2标题
                'content': "", //发布内容
                'image_path': "", //['图片1','图片2']上传图片json数组
                'province': "", //（选填）省编号
                'city': "", //（选填）市编号
                'area': "", //（选填）区编号
                'street': "", //（选填）街道编号
                'community': "", //（选填）社区编号
                'navigation_id': "", //栏目编号
            },
            reqType: "POST",
        },
        //  检查图片是否包含违规内容
        validImageSecurity: {
            reqUrl: _HOST + `/security/validImageSecurity`,
            reqData: {
                'image_path': "", //['图片1','图片2']上传图片json数组
            },
            reqType: "POST",
        },
    },
    My: {
        // 微信登录
        Login: {
            reqUrl: _HOST + `/users/wxLogin`,
            // reqUrl: _HOST + `/wxa/user/doLogin`,
            reqData: {
                code: ""
            },
            reqType: "POST",
            // reqType: "GET",
        },
       // 设置用户基本信息
       updateBaseInfo: {
        reqUrl: _HOST + `/users/updateBaseInfo`,
        reqData: {
            nickName: "",
            avatarUrl: "",
            gender: "",
            country: "",
            province: "",
            city: "",
            open_id: "",
        },
        reqType: "POST",
    },
        getUserPhone: {
            reqUrl: _HOST + `/users/getUserPhone`,
            reqData: {
                encrypted_data: "",
                vi: "",

                open_id: "",
            },
            reqType: "POST",
        },
        //  通过openid获取用户的基本信息
        getInfoByOpenID: {
            reqUrl: _HOST + `/users/getInfoByOpenID`,
            // reqUrl: _HOST + `/wxa/user/getUserInfo`,
            reqData: {
                open_id: "",
            },
            // reqType: "POST",
            reqType: "GET",
        },
        // 获取我的未读信息数量
        getNoReadNumber: {
            reqUrl: _HOST + `/my_messages/getNoReadNumber`,
            reqData: {
                open_id: "",
            },
            reqType: "POST",
        },
        // 获取赞过我的列表
        getPraiseMeList: {
            reqUrl: _HOST + `/my_messages/getPraiseMeList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        //  获取回复我的列表
        getReplyMeList: {
            reqUrl: _HOST + `/my_messages/getReplyMeList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        // 获取我发部的话题列表
        getMyVoice: {
            reqUrl: _HOST + `/community_voice/getMyPublicList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        // 获取我发布的评论
        getMyComments: {
            reqUrl: _HOST + `/comments/getMyPublicList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
            },
            reqType: "POST",
        },
        // 浏览记录
        getMyList1: {
            reqUrl: _HOST + `/my_browse_record/getMyList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '1', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "POST",
        },
        // 浏览记录
        getMyList2: {
            reqUrl: _HOST + `/my_browse_record/getMyList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '2', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "POST",
        },
        getMyList3: {
            reqUrl: _HOST + `/my_browse_record/getMyList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '3', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "POST",
        },
        // 获取我赞过的列表
        getMyPraiseList1: {
            reqUrl: _HOST + `/content_praise_record/getMyPraiseList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '1', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "POST",
        },
        getMyPraiseList2: {
            reqUrl: _HOST + `/content_praise_record/getMyPraiseList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '2', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "POST",
        },
        getMyPraiseList3: {
            reqUrl: _HOST + `/content_praise_record/getMyPraiseList`,
            reqData: {
                "open_id": "",
                "page": 1,
                "limit": 10,
                "type": '3', //浏览内容类型1-新闻，2-视频,3-社区之声
            },
            reqType: "POST",
        },
        // 获取申请社区审核状态
        getRegisterInfo: {
            reqUrl: _HOST + `/community/getRegisterInfo`,
            reqData: {
                "open_id": "",
            },
            reqType: "POST",
        },
        // 注册社区
        register: {
            reqUrl: _HOST + `/community/register`,
            reqData: {
                "open_id": "",
                'province': "",
                'city': "",
                'area': "",
                'street': "",
                'community_title': "",
                "longitude": "",
                "latitude": "",
                "address": "",
                "supporting_documents": "",
                "user_name": "",
                "phone": "",
            },
            reqType: "POST",
        },
    },
    share: {
        news_infoShare: {
            reqUrl: _HOST + `/news_info/updateShareNumber`,
            reqData: {
                "open_id": "",
                'id': "",
            },
            reqType: "POST",
        },
        video_infoShare: {
            reqUrl: _HOST + `/video_info/updateShareNumber`,
            reqData: {
                "open_id": "",
                'id': "",
            },
            reqType: "POST",
        },
        topic_infoShare: {
            reqUrl: _HOST + `/community_voice/updateShareNumber`,
            reqData: {
                "open_id": "",
                'id': "",
            },
            reqType: "POST",
        },
    }
};