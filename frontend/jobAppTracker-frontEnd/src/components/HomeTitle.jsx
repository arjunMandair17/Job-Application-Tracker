export default function HomeTitle() {
  return (
    <div
      className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-14 text-center"
      style={{
        marginBottom: 24,
        borderRadius: 24,
        border: "1px solid rgba(148,163,184,0.22)",
        boxShadow: "0 20px 50px rgba(15,23,42,0.10)",
        backgroundImage:
          "radial-gradient(circle at top, rgba(59,130,246,0.13), transparent 46%), linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(239,246,255,1) 100%)",
      }}
    >
      <h1 className="text-5xl font-black tracking-[0.15em] uppercase !text-slate-900 drop-shadow-sm">
        Job-Vault
      </h1>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
        Stay organized, stay ahead.
      </h3>
    </div>
  );
}
