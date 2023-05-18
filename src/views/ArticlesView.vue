<template>
    <div :class="$style.mainContainer">
        <div :class="$style.container">
            <div v-if="condition" :class="$style.hiddenContainer">
                <div :class="$style.hiddenTitle">숨겨진 게시물 입니다.</div>
            </div>
            <div v-else :class="$style.coverImageBox">
                <div :class="$style.imageBox">
                    <div :class="[$style.arrow, $style.left]"></div>
                    <div
                        :style="getBackgroundImage()"
                        :class="$style.image"
                    ></div>
                    <div :class="[$style.arrow, $style.right]"></div>
                </div>
            </div>
            <div :class="$style.coverSection">
                <div v-if="!condition" :class="$style.profileSection">
                    <div :class="$style.profileBox">
                        <div
                            :style="getProfileImage()"
                            :class="$style.profileImage"
                        ></div>
                        <div :class="$style.textBox">
                            <div :class="$style.profileName">
                                {{ getRegisteredUser().name }}
                            </div>
                            <div :class="$style.address">
                                {{ getRegisteredUser().location }}
                            </div>
                        </div>
                    </div>
                    <div :class="$style.temperatureSection">
                        <div :class="$style.box">
                            <div :class="$style.temperature">
                                <div
                                    :class="[
                                        getTemperatureNumber(),
                                        $style.number,
                                    ]"
                                >
                                    {{ getRegisteredUser().temperature }}
                                    ℃
                                </div>
                                <div :class="$style.gaugeBox">
                                    <div
                                        :style="getTemperatureGaugeStyle()"
                                        :class="[
                                            getTemperatureGauge(),
                                            $style.gauge,
                                        ]"
                                    ></div>
                                </div>
                            </div>
                            <div
                                :class="[getTemperatureIcon(), $style.faceIcon]"
                            ></div>
                        </div>
                        <div :class="$style.text">매너온도</div>
                    </div>
                </div>
                <div v-if="!condition" :class="$style.contentsSection">
                    <div :class="$style.name">
                        {{ getProduct().name }}
                    </div>
                    <div :class="$style.categoryBox">
                        <div :class="$style.category">
                            {{ getProduct().category }}

                            {{ convertTimeDate() }}
                        </div>
                    </div>
                    <div :class="$style.price">{{ convertPrice() }}원</div>

                    <div :class="$style.contents">
                        {{ getProduct().description }}
                    </div>
                    <div :class="$style.likesBox">
                        <div :class="$style.likes">
                            관심 {{ getProduct().likes }} ∙ 채팅
                            {{ getProduct().chats }} ∙ 조회
                            {{ getProduct().views }}
                        </div>
                    </div>
                </div>
                <div :class="$style.popularitySection">
                    <div :class="$style.titleBox">
                        <div :class="$style.title">당근마켓 인기중고</div>
                        <router-link :to="'/hot_articles'"
                            ><div :class="$style.button">
                                더 구경하기
                            </div></router-link
                        >
                    </div>
                    <div :class="$style.coverBox">
                        <div
                            v-for="item in transedProductsArray"
                            :class="$style.itemBox"
                            :key="item.id"
                        >
                            <router-link :to="`/articles?id=${item.id}`">
                                <div
                                    :style="
                                        getBackgroundItemImage(
                                            getTransProduct(item)
                                        )
                                    "
                                    :class="$style.itemImage"
                                ></div>
                                <div :class="$style.itemName">
                                    {{ getTransProduct(item).name }}
                                </div>
                                <div :class="$style.itemPrice">
                                    {{
                                        convertItemPrice(getTransProduct(item))
                                    }}
                                </div>
                                <div :class="$style.itemAddress">
                                    {{ getTransRegisteredUser(item).location }}
                                </div>
                                <div :class="$style.itemLikesBox">
                                    <div :class="$style.likes">
                                        관심 {{ getTransProduct(item).likes }} ·
                                        채팅
                                        {{ getTransProduct(item).chats }}
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import contentsList from "@/assets/contents.json";
import { Product, User } from "@/structure/types";

@Component({
    components: {},
})
export default class Articles extends Vue {
    productsArray: Product[] = [];
    transedProductsArray: Product[] = [];

    targetObject?: Product;

    condition: boolean = true;

    veriable: string = "";

    mounted() {
        this.productsArray = contentsList.products as Product[];

        this.productArrayHandler();
    }

    @Watch("$route.query")
    queryUpdated() {
        this.productArrayHandler();
    }

    productArrayHandler(): void {
        for (let i: number = 0; i < this.productsArray.length; i++) {
            if (this.productsArray[i].id == this.$route.query.id ?? "") {
                this.veriable = this.productsArray[i].id;
                this.targetObject = this.productsArray[i];
            }
        }
        this.transedProductsArray = this.productsArray.filter(
            (check) => check.id != this.veriable
        );
        this.transedProductsArray = this.transedProductsArray.slice(
            0,
            Math.min(6, this.productsArray.length)
        );
        this.condition = this.getProduct().is_hidden ?? false;
    }

    convertTimeDate(): string {
        let today = new Date();

        let convertDate: Date = new Date(
            (this.targetObject?.registered_date ?? 0) * 1000
        );

        let betweenTime: number = Math.floor(
            (today.getTime() - convertDate.getTime()) / 1000 / 60
        );

        if (betweenTime < 1) {
            return `∙ 방금전`;
        }

        if (betweenTime < 60) {
            return `∙ ${betweenTime}분전`;
        }

        let betweenTimeHour: number = Math.floor(betweenTime / 60);

        if (betweenTimeHour < 24) {
            return `∙ ${betweenTimeHour}시간전`;
        }

        let betweenTimeDay: number = Math.floor(betweenTimeHour / 24);

        if (betweenTimeDay < 365) {
            return `∙ ${betweenTimeDay}일전`;
        }
        return "";
    }

    convertPrice(): string {
        return this.getProduct()
            .price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    convertItemPrice(item: Product): string {
        return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getCheckDate(date: number) {
        if (date == 0)
            return {
                display: `none`,
            };
        else {
            return {};
        }
    }

    getBackgroundImage(): any {
        let randomNumber: number = Math.floor(
            Math.random() * this.getProduct().images.length
        );

        return {
            backgroundImage: `url("${this.getProduct().images[randomNumber]}")`,
        };
    }

    getBackgroundItemImage(item: Product): {} {
        if (item.images.length == 0) {
            return {};
        }

        return {
            backgroundImage: `url("${item.images[0]}")`,
        };
    }

    getProfileImage(): any {
        if (this.getRegisteredUser().thumbnail == null) {
            return {
                backgroundImage: `url(${require("@/assets/default.png")})`,
            };
        }

        return {
            backgroundImage: `url("${this.getRegisteredUser().thumbnail}")`,
        };
    }

    setTemperture(): number {
        let temperature: number =
            this.targetObject?.registered_by?.temperature ?? 0;
        return temperature;
    }

    getTemperatureNumber(): string {
        let temperature: number = this.setTemperture();

        if (temperature >= 60) {
            // @ts-ignore
            return this.$style.color1;
        }

        if (temperature >= 50) {
            // @ts-ignore
            return this.$style.color2;
        }

        if (temperature >= 40) {
            // @ts-ignore
            return this.$style.color3;
        }

        if (temperature >= 36.5) {
            // @ts-ignore
            return this.$style.color4;
        }

        if (temperature > 32) {
            // @ts-ignore
            return this.$style.color5;
        }

        if (temperature >= 0) {
            // @ts-ignore
            return this.$style.color6;
        }

        return "";
    }

    getTemperatureGaugeStyle(): {} {
        let temperature: number = this.setTemperture();

        if (temperature >= 60) {
            return {
                width: `${temperature}%`,
            };
        }

        if (temperature >= 50) {
            return {
                width: `${temperature}%`,
            };
        }

        if (temperature >= 40) {
            return {
                width: `${temperature}%`,
            };
        }

        if (temperature >= 36.5) {
            return {
                width: `${temperature}%`,
            };
        }

        if (temperature > 32) {
            return {
                width: `${temperature}%`,
            };
        }

        if (temperature >= 0) {
            return {
                width: `${temperature}%`,
            };
        }
        return {};
    }

    getTemperatureGauge(): string {
        let temperature = this.setTemperture();

        if (temperature >= 60) {
            // @ts-ignore
            return this.$style.color1;
        }

        if (temperature >= 50) {
            // @ts-ignore
            return this.$style.color2;
        }

        if (temperature >= 40) {
            // @ts-ignore
            return this.$style.color3;
        }

        if (temperature >= 36.5) {
            // @ts-ignore
            return this.$style.color4;
        }

        if (temperature > 32) {
            // @ts-ignore
            return this.$style.color5;
        }

        if (temperature >= 0) {
            // @ts-ignore
            return this.$style.color6;
        }

        return "";
    }

    getTemperatureIcon(): string {
        let temperature = this.setTemperture();

        if (temperature >= 60) {
            // @ts-ignore
            return this.$style.icon1;
        }

        if (temperature >= 50) {
            // @ts-ignore
            return this.$style.icon2;
        }

        if (temperature >= 40) {
            // @ts-ignore
            return this.$style.icon3;
        }

        if (temperature >= 36.5) {
            // @ts-ignore
            return this.$style.icon4;
        }

        if (temperature > 32) {
            // @ts-ignore
            return this.$style.icon5;
        }

        if (temperature >= 0) {
            // @ts-ignore
            return this.$style.icon6;
        }

        return "";
    }

    getRegisteredUser(): User {
        return (
            this.targetObject?.registered_by ?? {
                name: "",
                location: "",

                temperature: 0,
            }
        );
    }

    getProduct(): Product {
        return (
            this.targetObject ?? {
                id: "",
                name: "",
                price: 0,
                likes: 0,
                chats: 0,
                images: [],
                registered_by: this.getRegisteredUser(),
                is_hidden: false,
            }
        );
    }

    getTransRegisteredUser(item: Product): User {
        return (
            item.registered_by ?? {
                name: "",
                location: "",

                temperature: 0,
            }
        );
    }

    getTransProduct(item: Product): Product {
        return (
            item ?? {
                id: "",
                name: "",
                price: 0,
                likes: 0,
                chats: 0,
                images: [],
                registered_by: this.getTransRegisteredUser(item),
                is_hidden: false,
            }
        );
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

@mixin paddingTopBottom {
    padding-top: 30px;
    padding-bottom: 30px;
}

.mainContainer {
    .container {
        margin-top: 104px;

        @include setCenter;

        .hiddenContainer {
            height: 300px;

            margin-top: 104px;

            text-align: center;

            .hiddenTitle {
                margin-top: 420px;

                font-size: 24px;
            }
        }

        .imageBox {
            width: 100%;
            height: 502px;

            display: flex;
            justify-content: center;

            .arrow {
                width: 16px;
                height: 16px;

                margin-top: 250px;
                margin-left: 20px;
                margin-right: 20px;

                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .image {
                width: 670px;
                height: 500px;

                border-radius: 25px;

                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .left {
                background-image: url("@/assets/chvron_left.svg");
            }
            .right {
                background-image: url("@/assets/chvron_right.svg");
            }
        }
        .coverSection {
            max-width: 670px;

            @include setCenter;

            .profileSection {
                padding-top: 20px;

                display: flex;
                justify-content: space-between;

                .profileBox {
                    display: flex;

                    .profileImage {
                        width: 40px;
                        height: 40px;

                        border-radius: 20px;

                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center center;
                    }
                }
                .textBox {
                    padding-left: 10px;

                    .profileName {
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .address {
                        font-size: 13px;
                    }
                }
            }

            .temperatureSection {
                .box {
                    display: flex;
                    .temperature {
                        padding-right: 10px;
                        .number {
                            padding-top: 5px;
                            padding-right: 5px;
                            padding-bottom: 5px;

                            font-size: 16px;
                            font-weight: bold;

                            text-align: right;
                        }

                        .color1 {
                            color: rgb(222, 93, 6);
                        }

                        .color2 {
                            color: #df9100;
                        }

                        .color3 {
                            color: #319e45;
                        }

                        .color4 {
                            color: #1561a9;
                        }

                        .color5 {
                            color: #0c3d6c;
                        }

                        .color6 {
                            color: #061c32;
                        }
                        .gaugeBox {
                            width: 120px;
                            height: 6px;

                            border-radius: 5px;

                            background-color: #b3bac1;

                            .gauge {
                                height: 6px;

                                border-radius: 5px;
                            }

                            .color1 {
                                background-color: rgb(222, 93, 6);
                            }

                            .color2 {
                                background-color: #df9100;
                            }

                            .color3 {
                                background-color: #319e45;
                            }

                            .color4 {
                                background-color: #1561a9;
                            }

                            .color5 {
                                background-color: #0c3d6c;
                            }

                            .color6 {
                                background-color: #061c32;
                            }
                        }
                    }

                    .faceIcon {
                        width: 26px;
                        height: 26px;

                        margin-top: 8px;

                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center center;
                    }

                    .icon1 {
                        background-image: url("@/assets/face_1.png");
                    }

                    .icon2 {
                        background-image: url("@/assets/face_2.png");
                    }

                    .icon3 {
                        background-image: url("@/assets/face_3.png");
                    }

                    .icon4 {
                        background-image: url("@/assets/face_4.png");
                    }

                    .icon5 {
                        background-image: url("@/assets/face_5.png");
                    }

                    .icon6 {
                        background-image: url("@/assets/face_6.png");
                    }
                }
                .text {
                    padding-top: 6px;
                    padding-bottom: 4px;

                    font-size: 14px;

                    text-align: right;

                    color: #868e96;
                }
            }

            .contentsSection {
                border-top: 1px solid #eaebee;

                @include paddingTopBottom;

                .categoryBox {
                    .category {
                        padding-top: 5px;
                        padding-bottom: 5px;

                        font-size: 13px;

                        color: #868e96;
                    }
                }

                .name,
                .price {
                    font-size: 20px;
                    font-weight: bold;
                }
                .price {
                    font-size: 18px;
                }

                .contents {
                    padding-top: 20px;

                    white-space: pre-line;
                }

                .likesBox {
                    padding-top: 20px;

                    display: flex;

                    font-size: 13px;

                    color: #868e96;
                }
            }

            .popularitySection {
                border-top: 1px solid #eaebee;

                @include paddingTopBottom;

                .titleBox {
                    display: flex;
                    justify-content: space-between;

                    a {
                        text-decoration: none;
                    }

                    .title {
                        font-size: 18px;
                        font-weight: bold;
                    }

                    .button {
                        font-size: 16px;

                        color: #ff6f0f;
                    }
                }

                .coverBox {
                    max-width: 670px;

                    display: flex;
                    flex-wrap: wrap;

                    @include setCenter;

                    .itemBox {
                        width: calc(100% / 3);

                        padding: 10px;

                        a {
                            text-decoration: none;

                            color: rgb(33, 37, 41);
                        }

                        .itemImage {
                            width: 200px;
                            height: 200px;

                            margin-top: 20px;

                            border-radius: 25px;

                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center center;
                        }

                        .itemName {
                            padding-top: 10px;

                            font-size: 16px;

                            text-overflow: ellipsis;

                            white-space: nowrap;
                            overflow: hidden;
                        }

                        .itemPrice {
                            padding-top: 5px;

                            font-size: 15px;
                            font-weight: bold;
                        }

                        .itemAddress {
                            padding-top: 5px;

                            font-size: 13px;
                        }
                        .itemLikesBox {
                            .likes {
                                font-size: 13px;

                                color: rgb(134, 142, 150);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
