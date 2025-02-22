import { User } from "lucide-react";
import React from "react";

function SideBarSkeleton() {
  // vreate 8 skekelton items
  const skeletonContacts = Array(8).fill(null);
  return (
    <aside className="h-full w-20 log:w-72 border-r border-base-300 flrx flex-col transition-all duration-200">
      {/* header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <User className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      {/* skeleton contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* avtaar skelton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>
            {/* user info skeleton - only visible on large screen */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-3 w-32 mb-2"/>
              <div className="skeleton h-3 w-16"/>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SideBarSkeleton;
