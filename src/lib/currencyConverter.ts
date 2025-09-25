// Real-time currency conversion utility
export class CurrencyConverter {
  private static FALLBACK_RATE = 1650; // Fallback NGN to USD rate
  
  static async getNGNtoUSDRate(): Promise<number> {
    try {
      // Using a free API for real-time exchange rates
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const ngnRate = data.rates.NGN;
      return ngnRate || this.FALLBACK_RATE;
    } catch (error) {
      console.warn('Failed to fetch live exchange rate, using fallback:', error);
      return this.FALLBACK_RATE;
    }
  }
  
  static async convertNGNtoUSD(ngnAmount: number): Promise<number> {
    const rate = await this.getNGNtoUSDRate();
    return Math.round((ngnAmount / rate) * 100) / 100; // Round to 2 decimal places
  }
  
  static async formatPrice(ngnAmount: number): Promise<string> {
    const usdAmount = await this.convertNGNtoUSD(ngnAmount);
    return `₦${ngnAmount.toLocaleString()} (~$${usdAmount})`;
  }
}