// Order management system for DigiStore Nigeria
export interface Order {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentReference: string;
  downloadUrl: string;
  createdAt: string;
}

export interface OrderCreateData {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentReference: string;
  downloadUrl: string;
  createdAt: string;
}

class OrderService {
  private orders: Order[] = [];

  async createOrder(orderData: OrderCreateData): Promise<Order> {
    const order: Order = {
      ...orderData,
      createdAt: orderData.createdAt || new Date().toISOString()
    };

    // Store in memory (in production, this would be a database)
    this.orders.push(order);
    
    // Also store in localStorage for persistence across sessions
    try {
      const existingOrders = JSON.parse(localStorage.getItem('digistore_orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('digistore_orders', JSON.stringify(existingOrders));
    } catch (error) {
      console.warn('Could not save order to localStorage:', error);
    }

    console.log('Order created:', order);
    return order;
  }

  async getOrder(orderId: string): Promise<Order | null> {
    // Check memory first
    let order = this.orders.find(o => o.id === orderId);
    
    if (!order) {
      // Check localStorage
      try {
        const existingOrders = JSON.parse(localStorage.getItem('digistore_orders') || '[]');
        order = existingOrders.find((o: Order) => o.id === orderId);
      } catch (error) {
        console.warn('Could not read orders from localStorage:', error);
      }
    }

    return order || null;
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
    // Update in memory
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = status;
    }

    // Update in localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('digistore_orders') || '[]');
      const localOrderIndex = existingOrders.findIndex((o: Order) => o.id === orderId);
      if (localOrderIndex !== -1) {
        existingOrders[localOrderIndex].status = status;
        localStorage.setItem('digistore_orders', JSON.stringify(existingOrders));
        return existingOrders[localOrderIndex];
      }
    } catch (error) {
      console.warn('Could not update order in localStorage:', error);
    }

    return orderIndex !== -1 ? this.orders[orderIndex] : null;
  }

  async getAllOrders(): Promise<Order[]> {
    // Combine memory and localStorage orders
    const memoryOrders = [...this.orders];
    
    try {
      const localOrders = JSON.parse(localStorage.getItem('digistore_orders') || '[]');
      
      // Merge orders, avoiding duplicates
      const allOrders = [...memoryOrders];
      localOrders.forEach((localOrder: Order) => {
        if (!allOrders.find(o => o.id === localOrder.id)) {
          allOrders.push(localOrder);
        }
      });
      
      return allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.warn('Could not read orders from localStorage:', error);
      return memoryOrders;
    }
  }

  async getOrdersByEmail(email: string): Promise<Order[]> {
    const allOrders = await this.getAllOrders();
    return allOrders.filter(order => order.customerEmail.toLowerCase() === email.toLowerCase());
  }

  // Analytics methods
  async getTotalRevenue(): Promise<number> {
    const allOrders = await this.getAllOrders();
    return allOrders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.amount, 0);
  }

  async getOrderCount(): Promise<number> {
    const allOrders = await this.getAllOrders();
    return allOrders.length;
  }

  async getCompletedOrderCount(): Promise<number> {
    const allOrders = await this.getAllOrders();
    return allOrders.filter(order => order.status === 'completed').length;
  }
}

export const orderService = new OrderService();