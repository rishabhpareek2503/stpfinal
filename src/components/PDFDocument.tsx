import type React from "react"

interface PDFDocumentProps {
  userData: {
    name: string
    company: string
    email: string
    phone: string
  }
  plantData: {
    type: string
    capacity: number
    BOD: number
    COD: number
    TSS: number
    pH: number
    OilGrease: number
    Nitrogen: number
  }
  tankData: {
    [key: string]: number
  }
  equipmentData: {
    [key: string]: {
      name: string
      quantity: number
      basePrice: number
      totalPrice: number
    }
  }
  totalCost: number
}

const FIXED_COSTS = {
  commissioning: { name: "Commissioning and Handover", price: 70000 },
  installation: { name: "Installation", price: 40000 },
  panel: { name: "Panel", price: 70000 },
  cable: { name: "Cable and Cable Tray", price: 35000 },
  piping: { name: "Piping and Fitting", price: 80000 },
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ userData, plantData, tankData, equipmentData, totalCost }) => {
  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "0"
    return value.toLocaleString("en-IN") || "0"
  }

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "₹0"
    return `₹${price.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
  }

  return (
    <div
      className="pdf-document"
      style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <header style={{ borderBottom: "2px solid #2563eb", paddingBottom: "10px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "24px", color: "#1e3a8a", marginBottom: "8px" }}>WATER TREATMENT SOLUTIONS</h1>
        <p style={{ fontSize: "12px", color: "#64748b" }}>Generated on {formatDate()}</p>
      </header>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "18px", color: "#1e3a8a", marginBottom: "12px" }}>Client Information</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <p>
            <strong>Name:</strong> {userData.name || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {userData.company || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone || "N/A"}
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "18px", color: "#1e3a8a", marginBottom: "12px" }}>Plant Specifications</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <p>
            <strong>Plant Type:</strong> {plantData.type || "N/A"}
          </p>
          <p>
            <strong>Capacity:</strong> {plantData.capacity ? `${plantData.capacity} KLD` : "N/A"}
          </p>
          <p>
            <strong>BOD:</strong> {plantData.BOD ? `${plantData.BOD} mg/L` : "N/A"}
          </p>
          <p>
            <strong>COD:</strong> {plantData.COD ? `${plantData.COD} mg/L` : "N/A"}
          </p>
          <p>
            <strong>TSS:</strong> {plantData.TSS ? `${plantData.TSS} mg/L` : "N/A"}
          </p>
          <p>
            <strong>pH:</strong> {plantData.pH || "N/A"}
          </p>
          <p>
            <strong>Oil & Grease:</strong> {plantData.OilGrease ? `${plantData.OilGrease} mg/L` : "N/A"}
          </p>
          <p>
            <strong>Nitrogen:</strong> {plantData.Nitrogen ? `${plantData.Nitrogen} mg/L` : "N/A"}
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "18px", color: "#1e3a8a", marginBottom: "12px" }}>Tank Details</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9" }}>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Tank Name</th>
              <th style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>Volume (m³)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tankData).map(([key, value]) => (
              <tr key={key}>
                <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>
                  {formatNumber(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "18px", color: "#1e3a8a", marginBottom: "12px" }}>Equipment Details</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9" }}>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Equipment</th>
              <th style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>Quantity</th>
              <th style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(equipmentData).map(([key, equipment]) => (
              <tr key={key}>
                <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{equipment.name}</td>
                <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>
                  {equipment.quantity}
                </td>
                <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>
                  {formatPrice(equipment.totalPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "18px", color: "#1e3a8a", marginBottom: "12px" }}>Fixed Costs</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9" }}>
              <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Item</th>
              <th style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #e2e8f0" }}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(FIXED_COSTS).map(([key, item]) => (
              <tr key={key}>
                <td style={{ padding: "8px", borderBottom: "1px solid #f1f5f9" }}>{item.name}</td>
                <td style={{ padding: "8px", textAlign: "right", borderBottom: "1px solid #f1f5f9" }}>
                  {formatPrice(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "30px", borderTop: "2px solid #e2e8f0", paddingTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <strong>Equipment Cost:</strong>
          <span>{formatPrice(totalCost - Object.values(FIXED_COSTS).reduce((sum, item) => sum + item.price, 0))}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <strong>Fixed Costs:</strong>
          <span>{formatPrice(Object.values(FIXED_COSTS).reduce((sum, item) => sum + item.price, 0))}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px solid #e2e8f0",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <strong>Total Amount:</strong>
          <span>{formatPrice(totalCost)}</span>
        </div>
      </section>

      <section style={{ marginTop: "30px", fontSize: "12px", color: "#64748b" }}>
        <h2 style={{ fontSize: "16px", color: "#1e3a8a", marginBottom: "12px" }}>Terms & Conditions</h2>
        <ol style={{ paddingLeft: "20px" }}>
          <li>Validity: This quotation is valid for 30 days</li>
          <li>Payment: 50% advance, 40% delivery, 10% installation</li>
          <li>Delivery: 4-6 weeks from PO date</li>
          <li>Warranty: 12 months from commissioning</li>
          <li>GST extra as applicable</li>
        </ol>
      </section>

      <footer
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "10px",
          color: "#94a3b8",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "10px",
        }}
      >
        This is a computer-generated document. No signature is required.
      </footer>
    </div>
  )
}

export default PDFDocument

