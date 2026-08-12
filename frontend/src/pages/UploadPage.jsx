import UploadSection from '../components/UploadSection';

export default function UploadPage() {
  return (
    <div className="animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="text-gradient" style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-1px' }}>Process New Data</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Upload your utility bills, invoices, or ESG reports for AI processing.</p>
      </div>

      <UploadSection />
    </div>
  );
}
