"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

/* ✔ 苹果级滚动动画 Section（只改视觉，不动结构） */
const Section = ({ title, children }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 110 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
    className="px-6 py-28 md:py-40"
  >
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
        {title}
      </h2>

      <div className="mt-14">{children}</div>
    </div>
  </motion.section>
);

/* ✔ 苹果级卡片（只升级质感） */
const Card = ({ children }: any) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 140, damping: 18 }}
    className="
      p-8 md:p-10
      rounded-[28px]
      border border-white/10
      bg-white/5 backdrop-blur-2xl
      shadow-[0_25px_90px_rgba(0,0,0,0.6)]
    "
  >
    {children}
  </motion.div>
);

export default function Home() {

  /* =========================
     ✔ 修复模块（完全不动）
  ========================= */
  const [duration, setDuration] = useState(0);
  const [repair, setRepair] = useState(false);
  const [fps, setFps] = useState(false);
  const [color, setColor] = useState(false);

  const count = [repair, fps, color].filter(Boolean).length;

  const rate = useMemo(() => {
    if (count === 1) return 0.5;
    if (count === 2) return 0.8;
    if (count === 3) return 1.2;
    return 0;
  }, [count]);

  const price = useMemo(() => {
    if (!duration) return "0";
    return (duration * rate).toFixed(2);
  }, [duration, rate]);

  /* =========================
     ✔ AE代剪模块（完全不动）
  ========================= */
  const [aeDuration, setAeDuration] = useState(0);
  const [material, setMaterial] = useState(false);
  const [music, setMusic] = useState(false);

  const aePrice = useMemo(() => {
    const d = Number(aeDuration) || 0;
    if (!d) return "0";

    const base = d * 2; // 1秒2元
    const addon = (material ? 3 : 0) + (music ? 3 : 0);

    return (base + addon).toFixed(2);
  }, [aeDuration, material, music]);

  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* ✔ 苹果级背景光（只增强质感） */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute left-1/2 top-1/2
            h-[1000px] w-[1000px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-white/5 blur-[280px]
          "
        />
      </div>

      {/* ================= HERO（只调字感） ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="text-6xl md:text-8xl font-light tracking-tight"
        >
          ARTIST.EDIT<br />抑术家
        </motion.h1>

        <p className="mt-6 text-white/50 text-sm tracking-wide">
          AE代剪 · 共创服务 · 修复补帧 · 篮球素材 · AE预设
        </p>
      </section>

      {/* ================= AE代剪（不动内容） ================= */}
      <Section title="AE代剪(自动报价)">
        <Card>
          <p className="text-2xl font-bold mb-2">成品1秒2元（25s起剪）</p>

          <p className="text-white/70 mb-4">
            一条龙服务：补帧 · 修复 · 调色（主播同款）
          </p>

          <div className="text-white/60 space-y-2 text-sm mb-6 leading-relaxed">
            <p>素材自备 / +3元代找</p>
            <p>音乐自备 / +3元代找</p>
            <p>若有效果要求请提前沟通</p>
            <p>付了款即排队 等待成品期间请务催</p>
            <p>等不及随时可以退款</p>
          </div>

          <div className="border-t border-white/10 pt-6">

            <p className="text-white/70 mb-4">
              输入成品秒数 + 勾选附加服务自动报价
            </p>

            <input
              type="number"
              placeholder="请输入视频时长（秒）"
              className="
                w-full p-4 rounded-xl
                bg-white/5 border border-white/10
                text-white outline-none
                focus:border-white/30
              "
              onChange={(e) => setAeDuration(Number(e.target.value))}
            />

            <div className="space-y-3 text-sm text-white/70 mt-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" onChange={() => setMaterial(!material)} />
                是否自备素材？（否则勾选）
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" onChange={() => setMusic(!music)} />
                是否自备音乐？（否则勾选）
              </label>
            </div>

            <div className="mt-6 text-xl font-bold">
              总价：
              <span className="ml-2 text-white">{aePrice} 元</span>
            </div>

          </div>
        </Card>
      </Section>

      {/* ================= 共创（不动内容） ================= */}
      <Section title="抖音共创服务">
        <Card>
          <p className="text-2xl font-bold mb-2">30元 / 人</p>
          <p className="text-white/70 mb-4">每月4次 · 每次2人</p>

          <div className="text-white/60 space-y-1 text-sm">
           <p>不支持指定球星和发布日期</p>
            <p>付款进入排队</p>
            <p>付完款发抖音号</p>
            <p>排队期间排不到随时可退款</p>
            <p>插队每插一人/2元</p>
          </div>
        </Card>
      </Section>

      {/* ================= 修复（不动内容） ================= */}
      <Section title="代修复 / 补帧 / 调色（自动报价）">
        <Card>

          <p className="text-white/70 mb-6">
            输入时长 + 勾选服务，自动计算价格
          </p>

          <div className="text-white/60 space-y-1 text-sm mb-6">
            <p>修复 / 补帧 / 调色 各 0.5元 / 秒</p>
            <p>任选其二：0.8元 / 秒</p>
            <p>任选其三：1.2元 / 秒</p>
          </div>

          <input
            type="number"
            placeholder="请输入视频时长（秒）"
            className="
              w-full p-4 rounded-xl
              bg-white/5 border border-white/10
              text-white
            "
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <div className="space-y-3 text-sm text-white/70 mt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => setRepair(!repair)} />
              修复
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => setFps(!fps)} />
              补帧
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" onChange={() => setColor(!color)} />
              调色
            </label>
          </div>

          <div className="mt-6 text-xl font-bold">
            总价：{price} 元
          </div>

        </Card>
      </Section>

      {/* ================= 其他全部不动 ================= */}
      <Section title="篮球素材群（百度网盘）">
        <Card>
          <p className="text-2xl font-bold mb-2">20元 / 人</p>
          <div className="text-white/60 space-y-1 text-sm">
           <p>各个球星的篮球素材</p>
            <p>主播同款都会上传</p>
            <p>付款进入素材群</p>
            <p>网盘持续更新新素材资源</p>
            <p>单视频素材：3元 / 个</p>
          </div>
        </Card>
      </Section>

      <Section title="画质修复 / 补帧教学">
        <Card>
          <p className="text-2xl font-bold mb-2">Topaz video ai / SVFI</p>
          <div className="text-white/60 space-y-1 text-sm">
            <p>远程 ToDesk 教学手把手安装 + 调参数：60元</p>
            <p>单参数：40元</p>
            <p>补帧教学：30元(需先自行至steam购买SVFI)</p>
          </div>
        </Card>
      </Section>

      <Section title="同款AE预设">
        <Card>
          <div className="text-white/60 space-y-1 text-sm">
            <p>调色：30元</p>
            <p>转场：20元</p>
            <p>其他预设具体价格私聊</p>
            <p>支持AE 2023及以上版本</p>
             <p>2023以下可免费降级</p>
          </div>
        </Card>
      </Section>

      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h2 className="text-4xl font-bold mb-6">看好价格直接联系</h2>
         <h2 className="text-4xl font-bold mb-6">人数多若招待不周请多多包涵</h2>
         <h2 className="text-4xl font-bold mb-6">谢谢大家</h2>
        </div>
      </section>

      <div className="py-10 text-center text-white/40 text-sm">
        Dyin · 抑术家
      </div>

    </main>
  );
}