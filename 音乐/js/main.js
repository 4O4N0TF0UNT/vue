var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        musicUrl: "",
        musicCover: "",
        hotComments: [],
        isPlaying: false
       
    },
    methods: {
        // 歌曲搜索
        searchMusic: function () {
            var that = this;
            axios.get("http://music.cyrilstudio.top/search?keywords=" + this.query)
                .then(function (response) {
                    // console.log(response);
                    that.musicList = response.data.result.songs;
                }, function (err) { });
        },
        // 歌曲播放
        playMusic: function (musicId) {
            var that = this;
            // console.log(musicId);
            axios.get("http://music.cyrilstudio.top/song/url?id=" + musicId)
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.data[0].url);
                    that.musicUrl = response.data.data[0].url;
                }, function (err) { })

            // 歌曲详情获取
            axios.get("http://music.cyrilstudio.top/song/detail?ids=" + musicId)
                .then(function (response) {
                    // console.log(response);
                    // console.log(response.data.songs[0].al.picUrl);
                    that.musicCover = response.data.songs[0].al.picUrl;
                })

            // 歌曲评论
            axios.get("http://music.cyrilstudio.top/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    // console.log(response);
                    console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;

                }, function (err) { })
        },
        play: function () {
            // console.log("play");
            this.isPlaying=true;
        },
        pause: function () {
            // console.log("pause");
            this.isPlaying=false;
        },
      
      
    }
});