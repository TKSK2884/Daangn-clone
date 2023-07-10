<template>
    <div :class="$style.mainContainer">
        <div :class="$style.container">
            <div :class="$style.title">오늘의 중고 인기 검색어</div>
            <div :class="$style.section">
                <div
                    v-for="keyword in daangnArray"
                    :class="$style.rankBox"
                    :key="keyword.current_rank"
                >
                    <router-link :to="`/search?=${keyword.name}`">
                        <div :class="$style.coverBox">
                            <div :class="$style.box">
                                <div :class="$style.rank">
                                    {{ keyword.current_rank }}
                                </div>
                                <div :class="$style.name">
                                    {{ keyword.name }}
                                </div>
                            </div>
                            <div :class="$style.rankUpdate">
                                <span :class="getRankClassUpdate(keyword)">
                                    {{ getArrowUpdate(keyword) }}
                                </span>
                                <span :class="$style.bold">{{
                                    getRankUpdate(keyword)
                                }}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import daangnList from "@/assets/daangnlinks.json";
import { Keywords } from "@/structure/types";

@Component({
    components: {},
})
export default class TopKeywordsView extends Vue {
    daangnArray: Keywords[] = [];

    mounted() {
        this.daangnArray = daangnList.keywords;
    }

    getRankClassUpdate(rank: Keywords): string {
        if (rank.rank_changed == 0) {
            return "";
        }

        if (rank.rank_changed > 0) {
            // @ts-ignore
            return this.$style.upArrow;
        }

        if (rank.rank_changed < 0) {
            // @ts-ignore
            return this.$style.downArrow;
        }
        return "";
    }

    getArrowUpdate(rank: Keywords): string {
        return rank.rank_changed == 0 ? "" : rank.rank_changed > 0 ? "↑" : "↓";
    }

    getRankUpdate(rank: Keywords): string {
        if (rank.rank_changed == 0) {
            return "-";
        }

        if (rank.rank_changed != 0) {
            return `${Math.abs(rank.rank_changed)}`;
        }

        return "";
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

.mainContainer {
    .container {
        max-width: 400px;

        padding-bottom: 120px;
        margin-top: 80px;

        @include setCenter;

        .title {
            font-size: 32px;
            font-weight: bold;

            text-align: center;
        }

        .section {
            padding-top: 10px;

            .rankBox {
                padding: 12px;

                border-bottom: 1px solid #e3e3e5;

                a {
                    text-decoration: none;

                    color: #212529;
                }

                .coverBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;

                    .box {
                        display: flex;
                        align-items: flex-end;

                        .name {
                            font-size: 18px;
                        }

                        .rank {
                            margin-right: 20px;

                            font-size: 19px;
                            font-weight: bold;
                        }
                    }

                    .rankUpdate {
                        margin-left: 20px;

                        .upArrow {
                            color: #e03131;
                        }
                        .downArrow {
                            color: #186ec0;
                        }

                        .bold {
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
}
</style>

<style lang="scss"></style>
