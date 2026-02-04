import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, ShoppingBasket, Users, DollarSign } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { fetchAllUsers } from "@/store/admin/users-slice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { orderList } = useSelector((state) => state.adminOrder);
  const { userList } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getAllOrdersForAdmin());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const { totalRevenue, salesData } = useMemo(() => {
    if (!orderList || orderList.length === 0) {
      return { totalRevenue: 0, salesData: [] };
    }

    const revenue = orderList.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    // Group orders by date for the chart
    const salesMap = {};
    orderList.forEach((order) => {
      const date = new Date(order.orderDate).toLocaleDateString();
      if (!salesMap[date]) {
        salesMap[date] = 0;
      }
      salesMap[date] += order.totalAmount || 0;
    });

    const data = Object.keys(salesMap).map((date) => ({
      name: date,
      sales: salesMap[date],
    })).sort((a, b) => new Date(a.name) - new Date(b.name));

    // Limit to last 10 entries for cleaner chart if data is huge
    const last10Entries = data.slice(-10);

    return { totalRevenue: revenue, salesData: last10Entries };
  }, [orderList]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productList?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
            <BadgeCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderList?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userList?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
