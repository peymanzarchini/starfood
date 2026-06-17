import Container from "@/components/ui/Container";
import { useAdminStats } from "@/modules/admin";
import StatCard from "@/modules/admin/components/StatCard";
import { formatPrice } from "@/utils/formatPrice";
import {
  Package,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Tag,
  Star,
  MessageSquare,
  Loader2,
  TrendingUp,
  Truck,
} from "lucide-react";

const AdminDashboardPage = () => {
  const { orderStats, discountStats, reviewStats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-bold text-text-muted">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 min-h-screen">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-black text-text-main tracking-tight italic">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-text-muted font-medium mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-black text-text-main mb-6 flex items-center gap-2">
            <Package size={22} className="text-primary" /> Orders Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Today Revenue"
              value={`$${formatPrice(orderStats?.todayRevenue || 0)}`}
              icon={<DollarSign size={24} className="text-white" />}
              color="bg-green-500"
              subText={`${orderStats?.todayOrders || 0} orders today`}
            />
            <StatCard
              title="Total Orders"
              value={orderStats?.total || 0}
              icon={<TrendingUp size={24} className="text-white" />}
              color="bg-blue-500"
            />
            <StatCard
              title="Pending"
              value={orderStats?.pending || 0}
              icon={<Clock size={24} className="text-white" />}
              color="bg-amber-500"
            />
            <StatCard
              title="Delivering"
              value={orderStats?.delivering || 0}
              icon={<Truck size={24} className="text-white" />}
              color="bg-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-black text-text-main mb-6 flex items-center gap-2">
              <Tag size={22} className="text-primary" /> Discounts Status
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <StatCard
                title="Active Codes"
                value={discountStats?.active || 0}
                icon={<CheckCircle2 size={24} className="text-white" />}
                color="bg-emerald-500"
              />
              <StatCard
                title="Expired"
                value={discountStats?.expired || 0}
                icon={<XCircle size={24} className="text-white" />}
                color="bg-red-500"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-text-main mb-6 flex items-center gap-2">
              <MessageSquare size={22} className="text-primary" /> Reviews Status
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <StatCard
                title="Pending Approval"
                value={reviewStats?.pending || 0}
                icon={<Clock size={24} className="text-white" />}
                color="bg-amber-500"
              />
              <StatCard
                title="Average Rating"
                value={reviewStats?.averageRating || "0.0"}
                icon={<Star size={24} className="text-white" />}
                color="bg-yellow-500"
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default AdminDashboardPage;
