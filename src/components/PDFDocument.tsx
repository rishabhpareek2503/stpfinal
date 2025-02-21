"use client";

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#1e3a8a',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1e3a8a',
    marginBottom: 12,
    fontWeight: 'bold',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    fontSize: 11,
    color: '#64748b',
  },
  value: {
    flex: 1,
    fontSize: 11,
    color: '#0f172a',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomColor: '#e2e8f0',
    borderBottomWidth: 1,
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#f1f5f9',
    borderBottomWidth: 1,
    padding: 8,
  },
  tableCell: {
    fontSize: 10,
    color: '#0f172a',
  },
  col1: { width: '40%' },
  col2: { width: '30%' },
  col3: { width: '30%' },
  totalSection: {
    marginTop: 20,
    borderTop: 2,
    borderTopColor: '#e2e8f0',
    paddingTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: 'bold',
    marginRight: 20,
  },
  totalValue: {
    fontSize: 14,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  termsSection: {
    marginTop: 30,
    fontSize: 10,
    color: '#64748b',
  },
});

interface PDFDocumentProps {
  userData: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  plantData: {
    TSS: number;
    COD: number;
    BOD: number;
    type: string;
    capacity: number;
  };
  tankData: any; // TODO: Add specific type
  equipmentData: any; // TODO: Add specific type
  totalCost: number;
}

const FIXED_COSTS = {
  commissioning: { name: "Commissioning and Handover", price: 70000 },
  installation: { name: "Installation", price: 40000 },
  panel: { name: "Panel", price: 70000 },
  cable: { name: "Cable and Cable Tray", price: 35000 },
  piping: { name: "Piping and Fitting", price: 80000 }
};

const PDFDocument = ({ userData, plantData, tankData, equipmentData, totalCost }: PDFDocumentProps) => {
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper function to safely format numbers
  const formatNumber = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '0';
    return value.toLocaleString() || '0';
  };

  // Helper function to safely format currency
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return '₹0';
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src="/HEEPL.png" style={{ width: 100, height: 'auto', marginBottom: 10 }} /> 
          <Text style={styles.title}>WATER TREATMENT SOLUTIONS</Text>
          <Text style={styles.subtitle}>Generated on {formatDate()}</Text>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{userData.company || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userData.phone || 'N/A'}</Text>
          </View>
        </View>

        {/* Plant Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plant Specifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Plant Type:</Text>
            <Text style={styles.value}>{plantData.type || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Capacity:</Text>
            <Text style={styles.value}>{plantData.capacity ? `${plantData.capacity} KLD` : 'N/A'}</Text>
          </View>
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>BOD:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.BOD ? `${plantData.BOD} mg/L` : 'N/A'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>COD:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.COD ? `${plantData.COD} mg/L` : 'N/A'}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={[styles.label, { width: '50%' }]}>TSS:</Text>
                <Text style={[styles.value, { flex: 0 }]}>{plantData.TSS ? `${plantData.TSS} mg/L` : 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tank Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tank Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Tank Name</Text>
              <Text style={[styles.tableCell, styles.col2]}>Volume (m³)</Text>
              <Text style={[styles.tableCell, styles.col3]}>Breath(m)</Text>
            </View>
            {Object.entries(tankData || {}).map(([key, value]) => {
              if (typeof value === 'number' && key !== 'volume' && key !== 'length' && key !== 'height') {
                const breath = value / (tankData.height * tankData.length);
                return (
                  <View key={key} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.col1]}>
                      {key.replace(/([A-Z])/g, ' $1').trim() || 'N/A'}
                    </Text>
                    <Text style={[styles.tableCell, styles.col2]}>{value ? value.toFixed(2) : 'N/A'}</Text>
                    <Text style={[styles.tableCell, styles.col3]}>
                      {tankData.length && tankData.height ? `${tankData.length}×${breath.toFixed(2)}×${tankData.height}` : 'N/A'}
                    </Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>

        {/* Equipment Details - Now excluding fixed cost items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Details</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Equipment</Text>
              <Text style={[styles.tableCell, styles.col2]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.col3]}>Price (₹)</Text>
            </View>
            {Object.entries(equipmentData || {}).map(([key, equipment]: [string, any]) => {
              // Skip fixed cost components
              if (['commissioning', 'installation', 'panel', 'cable', 'piping'].includes(key)) {
                return null;
              }
              return (
                <View key={key} style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.col1]}>{equipment.name || 'N/A'}</Text>
                  <Text style={[styles.tableCell, styles.col2]}>{equipment.quantity || 0}</Text>
                  <Text style={[styles.tableCell, styles.col3]}>
                    {equipment.totalPrice ? formatPrice(equipment.totalPrice) : 'N/A'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Fixed Costs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fixed Costs</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>Item</Text>
              <Text style={[styles.tableCell, styles.col3]}>Price (₹)</Text>
            </View>
            {Object.entries(FIXED_COSTS).map(([key, item]) => (
              <View key={key} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>{item.name}</Text>
                <Text style={[styles.tableCell, styles.col3]}>{formatPrice(item.price)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Total Cost */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Equipment Cost:</Text>
            <Text style={styles.totalValue}>
              {formatPrice(totalCost - Object.values(FIXED_COSTS).reduce((sum, item) => sum + item.price, 0))}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Fixed Costs:</Text>
            <Text style={styles.totalValue}>
              {formatPrice(Object.values(FIXED_COSTS).reduce((sum, item) => sum + item.price, 0))}
            </Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 10, paddingTop: 10, borderTop: 1, borderTopColor: '#e2e8f0' }]}>
            <Text style={[styles.totalLabel, { fontSize: 16 }]}>Total Amount:</Text>
            <Text style={[styles.totalValue, { fontSize: 16 }]}>{formatPrice(totalCost)}</Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <Text>1. Validity: This quotation is valid for 30 days</Text>
          <Text>2. Payment: 50% advance, 40% delivery, 10% installation</Text>
          <Text>3. Delivery: 4-6 weeks from PO date</Text>
          <Text>4. Warranty: 12 months from commissioning</Text>
          <Text>5. GST extra as applicable</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This is a computer-generated document. No signature is required.
        </Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;

