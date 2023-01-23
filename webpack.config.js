const path  = require('path'); // 파일이나 폴더의 경로 작업을 위한 툴을 제공한다. path는 노드에서 제공하는 path모듈을 사용한다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 사용하지 않는 파일들 제거해줌

module.exports = {
    watch: true,
    entry : { // 각 html에 필요한 entry 파일
        index : './src/index.js',
        imoLogin : './src/login/login.js'
    }, // 시작파일, 여기서 시작해서 사용하는 모듈들을 모두 파악한다.
    output : {  //만들어지는 최종 파일을 내보내는 옵션이다.
        // filename : 'main.js', // 파일 이름
        path: path.resolve(__dirname, 'dist'), // 폴더를 의미한다. 현재 경로 하위에 dist 폴더를 의미한다.
        filename : '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test : /\.js$/,
                exclude: /node_modules/,
                use : "babel-loader"
            },
            {
                test: /\.css$/, //확장자가 css 일때,
                use: ["style-loader", "css-loader"], // use는 뒤에서부터 읽는다, css-loader로 읽고 style-loader로 넣어준다
                // use: [MiniCssExtractPlugin.loader, "css-loader"], // mini-css-extract-plugin을 style loader 대신 사용
            },
            {
                test: /\.svg|png|jpg|gif$/,
                type: "asset/inline",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'Index',
            filename : './index.html',
            template: './src/index.html',
            chunks : ['index'],
        }),
        new HtmlWebpackPlugin({
            title : 'Login',
            filename : './login/login.html',
            template: './src/login/login.html',
            chunks : ['login'],
        }),
        // new MiniCssExtractPlugin({
        //     filename : 'style.css'
        // }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        // static: {
        //     directory: path.resolve(__dirname, "dist"),
        // },
        hot: true,
        port: 8080, // 8080번 포트를 사용한다.
    },
};
