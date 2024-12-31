import * as React from "react"

interface TabsProps {
 defaultValue: string
 children: React.ReactNode
}

export function Tabs({ defaultValue, children }: TabsProps) {
 const [activeTab, setActiveTab] = React.useState(defaultValue)

 return (
   <div className="w-full">
     {React.Children.map(children, (child) => {
       if (React.isValidElement(child)) {
         return React.cloneElement(child, { activeTab, setActiveTab })
       }
       return child
     })}
   </div>
 )
}

interface TabsListProps {
 children: React.ReactNode
 activeTab?: string
 setActiveTab?: (value: string) => void
}

export function TabsList({ children, activeTab, setActiveTab }: TabsListProps) {
 return (
   <div className="flex border-b border-gray-200">
     {React.Children.map(children, (child) => {
       if (React.isValidElement(child)) {
         return React.cloneElement(child, { activeTab, setActiveTab })
       }
       return child
     })}
   </div>
 )
}

interface TabsTriggerProps {
 value: string
 children: React.ReactNode
 activeTab?: string
 setActiveTab?: (value: string) => void
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }: TabsTriggerProps) {
 const isActive = activeTab === value

 return (
   <button
     className={`px-4 py-2 ${
       isActive
         ? "border-b-2 border-blue-500 text-blue-600"
         : "text-gray-600 hover:text-gray-800"
     }`}
     onClick={() => setActiveTab?.(value)}
   >
     {children}
   </button>
 )
}

interface TabsContentProps {
 value: string
 children: React.ReactNode
 activeTab?: string
 className?: string
}

export function TabsContent({ value, children, activeTab, className }: TabsContentProps) {
 if (activeTab !== value) return null

 return <div className={className}>{children}</div>
}
