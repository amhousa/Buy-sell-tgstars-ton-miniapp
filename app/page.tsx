"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faTicket, faHistory, faUsers, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16">
        {activeTab === "home" && <HomePage />}
        {activeTab === "support" && <SupportPage />}
        {activeTab === "history" && <HistoryPage />}
        {activeTab === "referral" && <ReferralPage />}
      </main>
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        items={[
          { id: "home", label: "خانه", icon: faHome },
          { id: "support", label: "پشتیبانی", icon: faTicket },
          { id: "history", label: "تاریخچه", icon: faHistory },
          { id: "referral", label: "معرفی", icon: faUsers },
        ]}
      />
    </div>
  )
}

function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
  const [selectedCurrency, setSelectedCurrency] = useState<"ton" | "stars">("stars")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Handle form submission
  }

  const toggleTab = () => {
    setActiveTab(activeTab === "buy" ? "sell" : "buy")
  }

  const handleButtonClick = () => {
    alert("بزودی...");
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText("https://t.me/Stars_Hub_Bot?start=ref378")
    alert("لینک معرفی کپی شد!")
  }

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
              <Label htmlFor="currency">انتخاب ارز</Label>
        <Select onValueChange={(value: "ton" | "stars") => setSelectedCurrency(value)} defaultValue="stars">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب ارز" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ton">
              <span className="flex items-right">
                <p>TONCOIN - تون کوین</p>
                <img src="/ton.svg" alt="Ton" className="w-6 h-6 ml-5" />
              </span>
            </SelectItem>
            <SelectItem value="stars">
              <span className="flex items-right">
                <p>Telegram stars - استار</p>
                <img src="/star.png" alt="Stars" className="w-6 h-6 ml-5" />
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      <div>
        <Label htmlFor="phone">ID تلگرام</Label>
        <Input id="text" placeholder="@amhousa" className="rounded-md text-left" />
      </div>
      <div>

      </div>
      <div>
        <Label htmlFor="amount">مقدار {selectedCurrency === "ton" ? "تون کوین" : "استار"}</Label>
        <Input
          id="amount"
          type="number"
          placeholder={`مقدار ${selectedCurrency === "ton" ? "تون کوین" : "استار"}`}
          className="rounded-md"
        />
      </div>
      <div>
        <Label htmlFor="price">مبلغ</Label>
        <div className="flex items-center">
          <p id="price" className="rounded-md"> ۵۰،۰۰۰ </p>
          <span className="ml-2">تومان </span>
        </div>
      </div>
      <Button type="submit" className="w-full rounded-md" disabled={isLoading} onClick={handleButtonClick}>
        {isLoading ? "در حال پردازش..." : activeTab === "buy" ? "پرداخت" : "درخواست فروش"}
      </Button>
    </form>
  )

  return (
    <div className="p-4 space-y-4 flex flex-col items-end">
      <Card className="bg-secondary/80 backdrop-blur-md shadow-custom border border-border/50 rounded-lg w-full">
        <CardContent className="p-4 flex items-center justify-start" dir="ltr">
          <Avatar>
            <AvatarImage src="/user.jpg" alt="@username" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">@amhousa</h2>
          </div>
        </CardContent>
      </Card>

      <div className="w-full" dir="rtl">
        <Tabs value={activeTab} className="w-full">
          <div className="flex items-center justify-center mb-4 relative">
            <TabsList className="grid w-full grid-cols-2 rounded-lg">
              <TabsTrigger value="buy" onClick={() => setActiveTab("buy")} className="rounded-l-lg">
                خرید
              </TabsTrigger>
              <TabsTrigger value="sell" onClick={() => setActiveTab("sell")} className="rounded-r-lg">
                فروش
              </TabsTrigger>
            </TabsList>
            <Button
              onClick={toggleTab}
              variant="outline"
              size="icon"
              className="absolute rounded-full w-12 h-12 border border-primary/20 bg-background shadow-md"
            >
              <FontAwesomeIcon icon={activeTab === "buy" ? faArrowLeft : faArrowRight} className="h-6 w-6" />
            </Button>
          </div>
          <TabsContent value="buy">
            <Card className="shadow-custom border border-border/50 rounded-lg w-full">
              <CardHeader>
                <CardTitle className="text-center">خرید تون کوین و استار</CardTitle>
              </CardHeader>
              <CardContent>{renderForm()}</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sell">
            <Card className="shadow-custom border border-border/50 rounded-lg w-full">
              <CardHeader>
                <CardTitle className="text-center">فروش تون کوین و استار</CardTitle>
              </CardHeader>
              <CardContent>{renderForm()}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Card className="shadow-custom border border-border/50 rounded-lg w-full mt-6">
        <CardContent className="p-6 flex flex-col items-center">
          <img
            src="/star.png"
            alt="Telegram Star"
            className="w-24 h-24 mb-4"
          />
          <h3 className="text-xl font-bold mb-2 text-center">استارز هاب</h3>
          <p className="text-center text-sm leading-relaxed">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون کوین
            بلکه روزنامه و مجله در ستون کوین و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
            با هدف بهبود ابزارهای کاربردی می باشد.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-custom border border-border/50 rounded-lg w-full mt-6">
        <CardContent className="p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-center">امتیاز روزانه</h3>
          <p className="text-center text-sm leading-relaxed">امتیاز شما: 0</p>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full rounded-md" onClick={handleButtonClick}>
            دریافت امتیاز
          </button>
        </CardContent>
      </Card>

      <Card className="shadow-custom border border-border/50 rounded-lg w-full mt-6">
        <CardContent className="p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-center">لینک معرفی شما</h3>
          <p className="text-center text-sm leading-relaxed cursor-pointer" onClick={handleCopyClick}>
            https://t.me/Stars_Hub_Bot?start=ref378
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function SupportPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Handle form submission
  }

  return (
    <div className="p-4 flex justify-end" dir="rtl">
      <Card className="shadow-custom border border-border/50 rounded-lg w-full">
        <CardHeader>
          <CardTitle>پشتیبانی و تیکت‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">موضوع</Label>
              <Input id="subject" placeholder="موضوع" className="rounded-md" />
            </div>
            <div>
              <Label htmlFor="message">متن پیام</Label>
              <textarea
                id="message"
                className="w-full h-32 p-2 rounded-md bg-secondary text-secondary-foreground"
                placeholder="متن پیام"
              ></textarea>
            </div>
            <Button type="submit" className="w-full rounded-md" disabled={isLoading}>
              {isLoading ? "در حال ارسال..." : "ارسال تیکت"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function HistoryPage() {
  const transactions = [
    { id: 1, type: "خرید", amount: "100", token: "استار", date: "1402/12/01" },
    { id: 2, type: "فروش", amount: "50", token: "تون کوین", date: "1402/11/28" },
    // Add more transactions as needed
  ]

  return (
    <div className="p-4 flex justify-end" dir="rtl">
      <Card className="shadow-custom border border-border/50 rounded-lg w-full">
        <CardHeader>
          <CardTitle>تاریخچه تراکنش‌ها</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="bg-secondary/80 backdrop-blur-sm p-2 rounded-md shadow-sm">
                <div className="flex justify-between">
                  <span>
                    {transaction.type} {transaction.amount} {transaction.token}
                  </span>
                  <span>{transaction.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function ReferralPage() {
  return (
    <div className="p-4 flex justify-end" dir="rtl">
      <Card className="shadow-custom border border-border/50 rounded-lg w-full">
        <CardHeader>
          <CardTitle>معرفی و زیرمجموعه</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="referralLink">لینک معرفی شما</Label>
            <Input
              id="referralLink"
              value="https://t.me/Stars_Hub_Bot?start=ref378"
              readOnly
              className="rounded-md"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">تعداد زیرمجموعه‌های فعال</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">درآمد کل از معرفی</h3>
            <p className="text-2xl font-bold">0 تومان</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

