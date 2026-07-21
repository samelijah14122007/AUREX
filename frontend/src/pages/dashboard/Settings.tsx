import DashboardLayout from "@/layouts/DashboardLayout";

function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your AUREX account and preferences.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            Profile
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium">
                Full Name
              </label>

              <input
                defaultValue="Sam Elijah"
                className="mt-2 w-full rounded-xl border p-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email
              </label>

              <input
                defaultValue="sam@example.com"
                className="mt-2 w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <button className="mt-8 rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white">
            Save Changes
          </button>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            Password
          </h2>

          <div className="mt-8 space-y-5">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full rounded-xl border p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full rounded-xl border p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-xl border p-3"
            />

          </div>

          <button className="mt-8 rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white">
            Update Password
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;