export default {
    path: "/movie",
    component: () =>
        import ("@/views/movie"),
    //二级组建
    children: [{
            path: "city",
            component: () =>
                import ("@/components/City")
        },
        {
            path: "nowPlaying",
            component: () =>
                import ("@/components/NowPlaying")
        },
        {
            path: "comingSoon",
            component: () =>
                import ("@/components/ComingSoon")
        },
        {
            path: "search",
            component: () =>
                import ("@/components/Search")
        },
        {
            path: 'detail/N/:id',
            components: {
                default: () =>
                    import ("@/components/NowPlaying"),
                detail: () =>
                    import ("@/views/movie/detail")
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/S/:id',
            components: {
                default: () =>
                    import ("@/components/ComingSoon"),
                detail: () =>
                    import ("@/views/movie/detail")
            },
            props: {
                detail: true
            }
        },
        {
            path: "/movie",
            redirect: "/movie/NowPlaying"
        }
    ]
}