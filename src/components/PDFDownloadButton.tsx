"use client"

import type React from "react"
import PDFDocument from "./PDFDocument"
import { BlobProvider } from '@react-pdf/renderer'
import { Button } from "@/components/ui/button"

interface PDFDownloadButtonProps {
  userData: any
  plantData: any
  equipmentData: any
  tankData: any
  totalCost: number
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ 
  userData, 
  plantData, 
  equipmentData,
  tankData, 
  totalCost 
}) => {
  return (
    <BlobProvider document={
      <PDFDocument 
        userData={userData}
        plantData={plantData}
        equipmentData={equipmentData}
        tankData={tankData}
        totalCost={totalCost}
      />
    }>
      {({ loading, url }) => (
        <Button 
          variant="default" 
          onClick={() => url && window.open(url)}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      )}
    </BlobProvider>
  )
}

export default PDFDownloadButton

