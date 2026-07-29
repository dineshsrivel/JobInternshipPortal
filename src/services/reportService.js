const simulateNetwork = (data) => new Promise((resolve) => setTimeout(() => resolve({ data }), 200));

export const reportService = {
  generateReport: async (type, format) => {
    return await simulateNetwork({
      success: true,
      message: `${type.toUpperCase()} report successfully generated in ${format.toUpperCase()} format. Download starting...`,
      downloadUrl: `#mock-download-${type}-${format}`
    });
  }
};
